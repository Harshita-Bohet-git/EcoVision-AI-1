import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  Camera,
  RotateCcw,
  ScanLine,
  X,
  AlertCircle,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import { LoadingAnimation } from '@/components/shared/LoadingAnimation';
import { MaterialResultCard } from '@/components/shared/MaterialResultCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type ScanMode = 'idle' | 'webcam' | 'preview' | 'scanning' | 'result' | 'error';

interface ScanResultData {
  materialName: string;
  category: string;
  disposalMethod: string;
  confidence: number;
  recyclable: boolean;
  message: string;
  filename?: string;
  fileSizeBytes?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((t) => t.stop());
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScanCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {children}
    </div>
  );
}

function TipsSection() {
  return (
    <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        Tips for best results
      </h3>
      <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-500">
        {[
          'Good lighting — natural light works best for material detection.',
          'Clean background — isolate the item from clutter.',
          'Show labels or recycling symbols if they are visible.',
          'Full object — avoid extreme close-ups; show the entire shape.',
        ].map((tip) => (
          <li key={tip} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Scan() {
  const [mode, setMode] = useState<ScanMode>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [result, setResult] = useState<ScanResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [webcamError, setWebcamError] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop webcam whenever we leave webcam mode
  useEffect(() => {
    if (mode !== 'webcam') {
      stopStream(streamRef.current);
      streamRef.current = null;
    }
  }, [mode]);

  // Cleanup on unmount
  useEffect(() => () => stopStream(streamRef.current), []);

  // ── Webcam ────────────────────────────────────────────────────────────────

  const startWebcam = useCallback(async () => {
    setWebcamError('');
    setMode('webcam');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Camera access was denied. Please allow camera permissions and try again.'
          : 'Could not access the camera. Make sure no other app is using it.';
      setWebcamError(message);
    }
  }, []);

  const captureFrame = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;
        const url = await blobToDataUrl(blob);
        setCapturedBlob(blob);
        setPreviewUrl(url);
        setMode('preview');
      },
      'image/jpeg',
      0.92,
    );
  }, []);

  // ── File upload ───────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Only JPEG, PNG, and WEBP images are supported.');
      setMode('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large. Maximum size is 10 MB.');
      setMode('error');
      return;
    }
    const url = await blobToDataUrl(file);
    setCapturedBlob(file);
    setPreviewUrl(url);
    setMode('preview');
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // ── Submit to backend ─────────────────────────────────────────────────────

  const submitScan = useCallback(async () => {
    if (!capturedBlob) return;
    setMode('scanning');

    try {
      const formData = new FormData();
      formData.append('image', capturedBlob, 'scan.jpg');

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Server error ${response.status}`);
      }

      const data = (await response.json()) as ScanResultData;
      setResult(data);
      setMode('result');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setMode('error');
    }
  }, [capturedBlob]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const reset = () => {
    setMode('idle');
    setPreviewUrl(null);
    setCapturedBlob(null);
    setResult(null);
    setErrorMsg('');
    setWebcamError('');
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-xs font-semibold text-green-700 mb-4">
            <ScanLine className="h-3.5 w-3.5" />
            AI Scan
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Scan Waste Material
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Open your camera or upload a photo — our AI will identify the
            material and tell you exactly how to dispose of it.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── IDLE ────────────────────────────────────────────────────── */}
          {mode === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <ScanCard>
                {/* Webcam option */}
                <div className="p-8 border-b border-slate-100">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-7 w-7 text-green-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Open Camera</h2>
                    <p className="text-sm text-slate-400">
                      Use your device camera to capture the item in real time.
                    </p>
                  </div>
                  <Button
                    className="w-full h-11 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                    onClick={startWebcam}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Open Camera
                  </Button>
                </div>

                {/* Upload option */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                      <UploadCloud className="h-7 w-7 text-slate-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Upload Image</h2>
                    <p className="text-sm text-slate-400">
                      Pick a photo from your device or drag it into the zone below.
                    </p>
                  </div>

                  {/* Drop zone */}
                  <div
                    className={cn(
                      'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer',
                      isDragging
                        ? 'border-green-400 bg-green-50'
                        : 'border-slate-200 hover:border-green-300 hover:bg-slate-50',
                    )}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Click to browse or drag &amp; drop
                    </p>
                    <p className="text-xs text-slate-400">PNG, JPG, WEBP — max 10 MB</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </ScanCard>
              <TipsSection />
            </motion.div>
          )}

          {/* ── WEBCAM ──────────────────────────────────────────────────── */}
          {mode === 'webcam' && (
            <motion.div
              key="webcam"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              <ScanCard>
                <div className="relative bg-black rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Video feed */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />

                  {/* Scanning overlay frame */}
                  {!webcamError && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 relative">
                        {/* Corner brackets */}
                        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                          <span
                            key={corner}
                            className={cn(
                              'absolute w-8 h-8 border-green-400',
                              corner === 'top-left' && 'top-0 left-0 border-t-2 border-l-2 rounded-tl-sm',
                              corner === 'top-right' && 'top-0 right-0 border-t-2 border-r-2 rounded-tr-sm',
                              corner === 'bottom-left' && 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-sm',
                              corner === 'bottom-right' && 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm',
                            )}
                          />
                        ))}
                        {/* Sweep line */}
                        <motion.div
                          className="absolute left-1 right-1 h-0.5 bg-green-400/70"
                          animate={{ top: ['8px', 'calc(100% - 8px)', '8px'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Webcam error overlay */}
                  {webcamError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-8 text-center">
                      <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
                      <p className="text-white text-sm font-medium mb-4">{webcamError}</p>
                      <Button variant="outline" size="sm" onClick={reset} className="border-white/30 text-white hover:bg-white/10">
                        Go back
                      </Button>
                    </div>
                  )}

                  {/* Close button */}
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    aria-label="Close camera"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Capture button bar */}
                {!webcamError && (
                  <div className="px-8 py-6 flex items-center justify-between gap-4">
                    <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500">
                      Cancel
                    </Button>
                    <button
                      onClick={captureFrame}
                      className="w-16 h-16 rounded-full bg-white border-4 border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center shadow-lg"
                      aria-label="Capture photo"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500" />
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-slate-500"
                    >
                      <ImageIcon className="h-4 w-4 mr-1.5" />
                      Gallery
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                )}
              </ScanCard>
            </motion.div>
          )}

          {/* ── PREVIEW ─────────────────────────────────────────────────── */}
          {mode === 'preview' && previewUrl && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              <ScanCard>
                {/* Image preview */}
                <div className="relative bg-slate-100" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={previewUrl}
                    alt="Captured item"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-t-3xl pointer-events-none" />
                </div>

                {/* Actions */}
                <div className="px-8 py-6 space-y-3">
                  <p className="text-center text-sm text-slate-400 mb-4">
                    Looks good? Hit <span className="font-semibold text-slate-600">Scan</span> to analyse this item.
                  </p>
                  <Button
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                    onClick={submitScan}
                  >
                    <ScanLine className="mr-2 h-4 w-4" />
                    Scan This Item
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                    onClick={reset}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake / Choose Different Image
                  </Button>
                </div>
              </ScanCard>
              <TipsSection />
            </motion.div>
          )}

          {/* ── SCANNING ────────────────────────────────────────────────── */}
          {mode === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ScanCard>
                <div className="py-16 px-8 flex flex-col items-center">
                  <LoadingAnimation />
                  <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending to server…
                  </div>
                </div>
              </ScanCard>
            </motion.div>
          )}

          {/* ── RESULT ──────────────────────────────────────────────────── */}
          {mode === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <ScanCard>
                <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Analysis Complete</h2>
                    {result.filename && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {result.filename}
                        {result.fileSizeBytes &&
                          ` · ${(result.fileSizeBytes / 1024).toFixed(1)} KB`}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Scan Another
                  </Button>
                </div>

                {/* Side-by-side: preview + result */}
                <div className="p-8 grid md:grid-cols-2 gap-6 items-start">
                  {previewUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-square">
                      <img
                        src={previewUrl}
                        alt="Scanned item"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className={previewUrl ? '' : 'md:col-span-2'}>
                    <MaterialResultCard
                      materialName={result.materialName}
                      category={result.category}
                      disposalMethod={result.disposalMethod}
                      confidence={result.confidence}
                      recyclable={result.recyclable}
                    />
                    {result.message && (
                      <p className="mt-3 text-xs text-slate-400 italic text-center">
                        {result.message}
                      </p>
                    )}
                  </div>
                </div>
              </ScanCard>
            </motion.div>
          )}

          {/* ── ERROR ───────────────────────────────────────────────────── */}
          {mode === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ScanCard>
                <div className="py-16 px-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-7 w-7 text-red-500" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h2>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{errorMsg}</p>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                    onClick={reset}
                  >
                    Try Again
                  </Button>
                </div>
              </ScanCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
