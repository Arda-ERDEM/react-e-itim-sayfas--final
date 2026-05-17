import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  colorBorder?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'rainbow';
}

const colorMap = {
  red: 'border-l-red-500',
  orange: 'border-l-orange-500',
  yellow: 'border-l-yellow-500',
  green: 'border-l-green-500',
  blue: 'border-l-blue-500',
  violet: 'border-l-violet-500',
  rainbow: 'border-l-transparent'
};

export function CodeBlock({ code, title, colorBorder = 'rainbow' }: CodeBlockProps) {
  const isRainbow = colorBorder === 'rainbow';
  
  return (
    <div className={`my-6 rounded-lg overflow-hidden bg-[#0f0f14] shadow-lg border border-border/10 ${isRainbow ? 'border-l-4' : `border-l-4 ${colorMap[colorBorder]}`}`}
         style={isRainbow ? { borderImage: 'linear-gradient(to bottom, #E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787) 1' } : {}}>
      {title && (
        <div className="flex items-center px-4 py-2 bg-black/40 border-b border-white/5 text-xs text-gray-400 font-mono">
          <Terminal className="w-3 h-3 mr-2" />
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-gray-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
