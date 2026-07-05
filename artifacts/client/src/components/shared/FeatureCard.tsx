import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, badge, className, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
        {badge && (
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-600 border border-yellow-200">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{title}</h3>
      <p className="text-slate-500 leading-relaxed relative z-10">
        {description}
      </p>
    </motion.div>
  );
}
