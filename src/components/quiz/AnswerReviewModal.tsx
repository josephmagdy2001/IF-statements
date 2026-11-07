import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Question, Language } from '../../types/quiz';
import { CodeBlock } from './CodeBlock';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';

interface AnswerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  userAnswers: Record<string, number>;
  lang: Language;
}

export const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  lang,
}) => {
  if (!isOpen) return null;
  const t = translations[lang];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-3xl w-full max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                {t.reviewAnswers}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'مراجعة تفصيلية لجميع الأسئلة مع توضيح الإجابات والشرح الصحيح' : 'Detailed breakdown of each question and correct explanation'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="p-1.5 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Question List Scrollable */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {questions.map((q, qIdx) => {
              const selectedIdx = userAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctIndex;

              const displayedQuestion = (lang === 'ar' && q.questionArabic) ? q.questionArabic : q.question;
              const displayedOptions = (lang === 'ar' && q.optionsArabic) ? q.optionsArabic : q.options;
              const displayedTopic = (lang === 'ar' && q.topicArabic) ? q.topicArabic : q.topic;
              const displayedExplanation = (lang === 'ar' && q.explanationArabic) ? q.explanationArabic : q.explanation;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : isAnswered
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-slate-800/30 border-slate-700/40'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-slate-800 text-xs font-black text-slate-200 flex items-center justify-center">
                        #{qIdx + 1}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                        {q.grade} • {displayedTopic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" /> {t.correctAnswers} (+{q.points} {t.ptsLabel})
                        </span>
                      ) : isAnswered ? (
                        <span className="text-rose-400 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-xl border border-rose-500/20">
                          <XCircle className="w-4 h-4" /> {t.incorrectAnswers} (0 {t.ptsLabel})
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1 bg-slate-700/40 px-2.5 py-1 rounded-xl">
                          {lang === 'ar' ? 'لم تتم الإجابة' : 'Not Answered'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="font-bold text-white text-sm sm:text-base mb-2">
                    {displayedQuestion}
                  </p>

                  {q.codeSnippet && <CodeBlock code={q.codeSnippet} />}

                  {/* Options Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                    {displayedOptions.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isOptionCorrect = optIdx === q.correctIndex;

                      let style = 'bg-slate-900/60 border-slate-800 text-slate-300';
                      if (isOptionCorrect) {
                        style = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isOptionSelected) {
                        style = 'bg-rose-600/30 border-rose-500 text-rose-200 font-bold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs sm:text-sm ${style}`}
                        >
                          <span className={`w-5 h-5 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isOptionCorrect ? 'bg-emerald-500 text-white' : isOptionSelected ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {isOptionSelected && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-indigo-500/30 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-bold mb-1">
                      <HelpCircle className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'التوضيح والشرح:' : 'Explanation:'}</span>
                    </div>
                    <p>{displayedExplanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-800/80 border-t border-slate-700/80 flex justify-end shrink-0">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-sm"
            >
              {t.closeReview}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
