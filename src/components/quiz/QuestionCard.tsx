import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Languages,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question, GameMode, MascotMood } from '../../types/quiz';
import { CodeBlock } from './CodeBlock';
import { soundFx } from '../../utils/sound';
import { announcer } from '../../utils/speech';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | undefined;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  gameMode: GameMode;
  onMascotMoodChange: (mood: MascotMood, message?: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit,
  gameMode,
  onMascotMoodChange,
}) => {
  const [showArabic, setShowArabic] = useState(false);
  const [teacherReveal, setTeacherReveal] = useState(false);

  const isAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption === question.correctIndex;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleOptionClick = (idx: number) => {
    // If already answered in student mode, don't re-trigger sounds
    if (isAnswered && gameMode === 'student') return;

    soundFx.playClick();
    onSelectOption(idx);

    if (idx === question.correctIndex) {
      soundFx.playCorrect();
      announcer.announceCorrect();
      onMascotMoodChange('celebrating', 'Super Python Star! Correct!');
    } else {
      soundFx.playIncorrect();
      announcer.announceIncorrect();
      onMascotMoodChange('sad', 'Oops! Take a look at the explanation!');
    }
  };

  const getDifficultyBadge = () => {
    switch (question.difficulty) {
      case 'easy':
        return { label: 'Easy • Grade 4', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'medium':
        return { label: 'Medium • Grade 5', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'hard':
        return { label: 'Hard • Grade 6', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    }
  };

  const badge = getDifficultyBadge();

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-8 shadow-2xl backdrop-blur-xl relative"
    >
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-bold rounded-xl border ${badge.color}`}>
            {badge.label}
          </span>
          <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-slate-800 text-slate-300">
            {question.topic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Points badge */}
          <span className="px-3 py-1 text-xs font-black rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            +{question.points} Pts
          </span>

          {/* Bilingual Toggle Button */}
          {question.questionArabic && (
            <button
              onClick={() => {
                soundFx.playClick();
                setShowArabic(!showArabic);
              }}
              className="p-1.5 px-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-xl text-indigo-300 text-xs font-bold transition flex items-center gap-1.5"
              title="ترجمة السؤال إلى العربية"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showArabic ? 'English' : 'عربي'}</span>
            </button>
          )}

          {/* Teacher Reveal Toggle */}
          {gameMode === 'teacher' && (
            <button
              onClick={() => {
                soundFx.playClick();
                setTeacherReveal(!teacherReveal);
              }}
              className="px-3 py-1 text-xs font-bold rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center gap-1.5 hover:bg-purple-500/30 transition"
            >
              {teacherReveal ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{teacherReveal ? 'Hide Answer' : 'Teacher Reveal'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Title & Text */}
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-relaxed">
          {question.question}
        </h3>

        {/* Optional Arabic Question */}
        {showArabic && question.questionArabic && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-base text-yellow-300/90 font-semibold mb-2 bg-slate-950/40 p-3 rounded-xl border border-yellow-500/20 text-right leading-relaxed"
            dir="rtl"
          >
            {question.questionArabic}
          </motion.p>
        )}
      </div>

      {/* Code Snippet Box (if any) */}
      {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}

      {/* 4 Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const isSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctIndex;

          let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/70 text-slate-100';

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]';
            } else if (isSelected) {
              btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200 ring-2 ring-rose-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
            } else {
              btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-60';
            }
          } else if (teacherReveal && isThisCorrect) {
            btnStyle = 'bg-purple-600/30 border-purple-500 text-purple-200 ring-2 ring-purple-500/50';
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered && gameMode === 'student'}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3.5 relative ${btnStyle}`}
            >
              {/* Option Letter Badge */}
              <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                isAnswered && isThisCorrect
                  ? 'bg-emerald-500 text-white'
                  : isAnswered && isSelected
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-700 text-slate-200'
              }`}>
                {letter}
              </span>

              {/* Option Text */}
              <span className="font-semibold text-sm sm:text-base leading-snug flex-1 pt-0.5">
                {option}
              </span>

              {/* Status Icons */}
              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
              )}
              {isAnswered && isSelected && !isThisCorrect && (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Immediate Visual Feedback & Explanation */}
      <AnimatePresence>
        {(isAnswered || teacherReveal) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 md:p-5 rounded-2xl border-2 mb-6 ${
              isCorrect || teacherReveal
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-900/60 mt-0.5 shrink-0">
                {isCorrect || teacherReveal ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-rose-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm md:text-base mb-1 text-white">
                  {isCorrect || teacherReveal ? 'Awesome! Correct Explanation:' : 'Good Try! Here is why:'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  {question.explanation}
                </p>
                {showArabic && question.explanationArabic && (
                  <p className="text-xs sm:text-sm mt-2 text-yellow-300/90 text-right font-medium" dir="rtl">
                    {question.explanationArabic}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={() => {
            soundFx.playClick();
            onPrev();
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition flex items-center gap-1.5 text-xs sm:text-sm active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {isLastQuestion ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onSubmit();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quiz</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onNext();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-md transition active:scale-95 flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

