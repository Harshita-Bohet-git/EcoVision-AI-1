import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface MaterialResultCardProps {
  materialName: string;
  category: string;
  disposalMethod: string;
  confidence: number;
  recyclable: boolean;
  date?: string;
}

export function MaterialResultCard({ 
  materialName, 
  category, 
  disposalMethod, 
  confidence, 
  recyclable,
  date
}: MaterialResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-200/50">
                {category}
              </span>
              {date && <span className="text-xs text-slate-400">{date}</span>}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{materialName}</h3>
          </div>
          
          {recyclable ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-1" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Recyclable</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <XCircle className="h-8 w-8 text-red-500 mb-1" />
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Landfill</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-slate-500">AI Confidence</span>
            <span className="font-medium text-slate-900">{confidence}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mt-auto">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-slate-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Disposal Instructions</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {disposalMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
