import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  // Simple kid-friendly syntax highlighter for Python snippets
  const highlightPython = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Split tokens roughly for syntax coloring
      const tokens = line.split(/(\s+|#.*|"[^"]*"|'[^']*'|[()=,:><!+])/g);

      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell pr-4 select-none text-slate-500 text-xs text-right font-mono opacity-60">
            {lineIdx + 1}
          </span>
          <span className="table-cell font-mono text-sm sm:text-base leading-relaxed">
            {tokens.map((token, tokenIdx) => {
              if (token.startsWith('#')) {
                return (
                  <span key={tokenIdx} className="text-slate-400 italic">
                    {token}
                  </span>
                );
              }
              if (['if', 'elif', 'else', 'def', 'return', 'and', 'or', 'not', 'True', 'False'].includes(token)) {
                return (
                  <span key={tokenIdx} className="text-pink-400 font-bold">
                    {token}
                  </span>
                );
              }
              if (token === 'print') {
                return (
                  <span key={tokenIdx} className="text-amber-300 font-semibold">
                    {token}
                  </span>
                );
              }
              if (token.startsWith('"') || token.startsWith("'")) {
                return (
                  <span key={tokenIdx} className="text-emerald-400 font-medium">
                    {token}
                  </span>
                );
              }
              if (/^\d+$/.test(token)) {
                return (
                  <span key={tokenIdx} className="text-purple-300 font-bold">
                    {token}
                  </span>
                );
              }
              if (['==', '=', '!=', '>', '<', '>=', '<='].includes(token)) {
                return (
                  <span key={tokenIdx} className="text-cyan-300 font-bold">
                    {token}
                  </span>
                );
              }
              return (
                <span key={tokenIdx} className="text-slate-100">
                  {token}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="w-full my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950/90 shadow-xl">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-400 ml-2 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            challenge.py
          </span>
        </div>
        <span className="text-[11px] font-bold text-indigo-400/90 px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
          Python 3
        </span>
      </div>

      {/* Code Lines */}
      <div className="p-4 overflow-x-auto text-left">
        <div className="table w-full">
          {highlightPython(code)}
        </div>
      </div>
    </div>
  );
};

