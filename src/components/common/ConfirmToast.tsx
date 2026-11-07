import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogOut, X } from 'lucide-react';
import { Language } from '../../types/quiz';

interface ConfirmToastProps {
  isOpen: boolean;
  lang: Language;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmToast: React.FC<ConfirmToastProps> = ({
  isOpen,
  lang,
  onConfirm,
  onCancel,
}) => {
  const isAr = lang === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="toast-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Toast Panel */}
          <motion.div
            key="toast-panel"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="bg-slate-900 border border-rose-500/50 rounded-2xl shadow-2xl shadow-rose-900/30 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-400" />

              <div className="p-5">
                {/* Icon + message */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm leading-snug">
                      {isAr ? 'هل تريد الخروج من الاختبار؟' : 'Leave the quiz?'}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {isAr
                        ? 'سيتم فقدان تقدمك الحالي في الجلسة.'
                        : 'Your current quiz progress will be lost.'}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                  {/* Confirm (Yes) */}
                  <button
                    onClick={onConfirm}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-rose-900/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isAr ? 'نعم، اخرج' : 'Yes, Exit'}</span>
                  </button>

                  {/* Cancel (No) */}
                  <button
                    onClick={onCancel}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>{isAr ? 'لا، ارجع' : 'No, Stay'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

