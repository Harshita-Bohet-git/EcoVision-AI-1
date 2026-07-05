import React, { useState } from 'react';
import { MaterialResultCard } from '@/components/shared/MaterialResultCard';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockHistory = [
  {
    id: 1,
    materialName: "Delivery Box",
    category: "Corrugated Cardboard",
    disposalMethod: "Flatten completely. Keep dry. Place in paper recycling.",
    confidence: 99,
    recyclable: true,
    date: "2 hours ago"
  },
  {
    id: 2,
    materialName: "Yogurt Cup",
    category: "Polypropylene (#5)",
    disposalMethod: "Rinse completely clean of food residue. Place in plastics recycling.",
    confidence: 87,
    recyclable: true,
    date: "Yesterday"
  },
  {
    id: 3,
    materialName: "Chip Bag",
    category: "Multi-layer Film",
    disposalMethod: "Not recyclable in curbside bins. Throw in landfill trash. (Some specialty store drop-offs may accept).",
    confidence: 94,
    recyclable: false,
    date: "Yesterday"
  },
  {
    id: 4,
    materialName: "Soda Can",
    category: "Aluminum",
    disposalMethod: "Empty liquids. Do not crush (unless local rules specify). Place in metal recycling.",
    confidence: 99,
    recyclable: true,
    date: "2 days ago"
  },
  {
    id: 5,
    materialName: "Greasy Pizza Box",
    category: "Contaminated Paper",
    disposalMethod: "Tear off the clean lid to recycle. Throw the greasy bottom half in the trash or compost if facility accepts.",
    confidence: 92,
    recyclable: false,
    date: "1 week ago"
  },
  {
    id: 6,
    materialName: "Glass Pasta Jar",
    category: "Clear Glass",
    disposalMethod: "Rinse clean. Remove metal lid and recycle separately. Place in glass recycling.",
    confidence: 96,
    recyclable: true,
    date: "1 week ago"
  }
];

export default function History() {
  const [filter, setFilter] = useState<'all' | 'recyclable' | 'non-recyclable'>('all');

  const filteredHistory = mockHistory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'recyclable') return item.recyclable;
    if (filter === 'non-recyclable') return !item.recyclable;
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Scan History</h1>
            <p className="text-slate-500">Your recent classification results and disposal guides.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            {(['all', 'recyclable', 'non-recyclable'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors capitalize",
                  filter === f 
                    ? "bg-green-100 text-green-700" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item) => (
              <MaterialResultCard 
                key={item.id}
                materialName={item.materialName}
                category={item.category}
                disposalMethod={item.disposalMethod}
                confidence={item.confidence}
                recyclable={item.recyclable}
                date={item.date}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center flex flex-col items-center">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No scans found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              You haven't scanned any {filter !== 'all' ? filter.replace('-', ' ') : ''} items yet. Try scanning something to see it here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
