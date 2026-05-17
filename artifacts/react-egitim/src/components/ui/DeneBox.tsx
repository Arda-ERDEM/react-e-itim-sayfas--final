import React, { ReactNode } from 'react';
import { Beaker } from 'lucide-react';

interface DeneBoxProps {
  title?: string;
  children: ReactNode;
}

export function DeneBox({ title = "Dene!", children }: DeneBoxProps) {
  return (
    <div className="my-8 rounded-xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-900/10 overflow-hidden shadow-sm">
      <div className="flex items-center px-4 py-2.5 bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 text-sm font-bold border-b border-yellow-200 dark:border-yellow-900">
        <Beaker className="w-4 h-4 mr-2" />
        {title}
      </div>
      <div className="p-6 bg-card text-card-foreground">
        {children}
      </div>
    </div>
  );
}
