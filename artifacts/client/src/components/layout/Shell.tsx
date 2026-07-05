import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-slate-900 selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main className="flex-1 pt-16 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
