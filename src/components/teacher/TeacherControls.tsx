import React from 'react';
import { BookOpen, Layers, LogOut } from 'lucide-react';
import { Question } from '../../types/quiz';
import { soundFx } from '../../utils/sound';

interface TeacherControlsProps {
  questions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onExitTeacherMode: () => void;
}

export const TeacherControls: React.FC<TeacherControlsProps> = ({
  questions,
  currentIndex,
  onSelectQuestion,
  onExitTeacherMode,
}) => {
  return (
    <div className="w-full bg-purple-950/40 border border-purple-500/40 rounded-2xl p-3 md:p-4 mb-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-500/20 rounded-xl text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-purple-200">
              Teacher Presentation Mode
            </h4>
            <p className="text-[11px] text-purple-300/80">
              Unlimited attempts • Free question navigation • Answer reveal enabled
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onExitTeacherMode();
          }}
          className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit to Student Mode</span>
        </button>
      </div>

      {/* Quick Jump Question Grid */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
          <Layers className="w-3 h-3 text-purple-400" />
          Jump:
        </span>
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => {
                soundFx.playClick();
                onSelectQuestion(idx);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-black transition shrink-0 ${
                isCurrent
                  ? 'bg-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title={`${q.grade}: ${q.title}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

