import React from 'react';
import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-200 w-full max-w-md mx-auto aspect-square">
      <div className="relative w-48 h-48 mb-8 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center shadow-inner">
        {/* Mock background pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, slate 1px, transparent 0)', 
               backgroundSize: '16px 16px' 
             }} 
        />
        
        {/* Pulsing circle */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-16 h-16 bg-green-100 rounded-full blur-xl"
        />
        
        <Scan className="h-12 w-12 text-slate-300 relative z-10" />

        {/* Sweeping scan line */}
        <motion.div
          animate={{ y: ['-10%', '110%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] z-20"
        />
        
        <motion.div
          animate={{ y: ['-10%', '110%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent to-green-500/20 -translate-y-full z-10"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"
        />
        <h3 className="text-lg font-medium text-slate-900">Analyzing material...</h3>
      </div>
      <p className="text-sm text-slate-500 mt-2">Our AI is determining the composition</p>
    </div>
  );
}
