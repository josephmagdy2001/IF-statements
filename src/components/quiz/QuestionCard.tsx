import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
} from 'lucide-react';
import { Question, Language, MascotMood } from '../../types/quiz';
import { CodeBlock } from './CodeBlock';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';
import { announcer } from '../../utils/speech';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | undefined;
  lang: Language;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onMascotMoodChange: (mood: MascotMood, message?: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  lang,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit,
  onMascotMoodChange,
}) => {
  const t = translations[lang];

  const isAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption === question.correctIndex;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;

    soundFx.playClick();
    onSelectOption(idx);

    if (idx === question.correctIndex) {
      soundFx.playCorrect();
      announcer.announceCorrect();
      onMascotMoodChange('celebrating', lang === 'ar' ? 'إجابة ممتازة وصحيحة يا بطل!' : 'Super Python Star! Correct!');
    } else {
      soundFx.playIncorrect();
      announcer.announceIncorrect();
      onMascotMoodChange('sad', lang === 'ar' ? 'لا بأس! اقرأ التوضيح لتتعلم منه!' : 'Oops! Take a look at the explanation!');
    }
  };

  const getDifficultyBadge = () => {
    switch (question.difficulty) {
      case 'easy':
        return {
          label: lang === 'ar' ? 'مبتدئ • الصف الرابع' : 'Easy • Grade 4',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        };
      case 'medium':
        return {
          label: lang === 'ar' ? 'متوسط • الصف الخامس' : 'Medium • Grade 5',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        };
      case 'hard':
        return {
          label: lang === 'ar' ? 'متقدم • الصف السادس' : 'Hard • Grade 6',
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        };
    }
  };

  const badge = getDifficultyBadge();

  // Pick options and text based on current language
  const displayedQuestion = (lang === 'ar' && question.questionArabic) ? question.questionArabic : question.question;
  const displayedOptions = (lang === 'ar' && question.optionsArabic) ? question.optionsArabic : question.options;
  const displayedTopic = (lang === 'ar' && question.topicArabic) ? question.topicArabic : question.topic;
  const displayedExplanation = (lang === 'ar' && question.explanationArabic) ? question.explanationArabic : question.explanation;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: lang === 'ar' ? -25 : 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: lang === 'ar' ? 25 : -25 }}
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
            {displayedTopic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Points badge */}
          <span className="px-3 py-1 text-xs font-black rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            +{question.points} {t.ptsLabel}
          </span>
        </div>
      </div>

      {/* Question Title & Text */}
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-relaxed">
          {displayedQuestion}
        </h3>
      </div>

      {/* Code Snippet Box (if any) */}
      {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}

      {/* 4 Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
        {displayedOptions.map((option, idx) => {
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
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border-2 text-left rtl:text-right transition-all duration-200 flex items-start gap-3.5 relative ${btnStyle}`}
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
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 md:p-5 rounded-2xl border-2 mb-6 ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-900/60 mt-0.5 shrink-0">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-rose-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm md:text-base mb-1 text-white">
                  {isCorrect ? t.explanationCorrect : t.explanationIncorrect}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  {displayedExplanation}
                </p>
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
          <ChevronLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          <span>{t.prevBtn}</span>
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
              <span>{t.submitBtn}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onNext();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-md transition active:scale-95 flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <span>{t.nextBtn}</span>
              <ChevronRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
