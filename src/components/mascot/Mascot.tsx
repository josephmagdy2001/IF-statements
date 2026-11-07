import React from 'react';
import { motion } from 'framer-motion';
import { MascotMood } from '../../types/quiz';

interface MascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  message,
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56',
  };

  const getMoodColors = () => {
    switch (mood) {
      case 'celebrating':
        return { primary: '#22c55e', secondary: '#FFD43B', glow: 'rgba(34,197,94,0.4)' };
      case 'warning':
      case 'sad':
        return { primary: '#ef4444', secondary: '#f97316', glow: 'rgba(239,68,68,0.3)' };
      case 'thinking':
        return { primary: '#3b82f6', secondary: '#8b5cf6', glow: 'rgba(59,130,246,0.3)' };
      case 'cool':
      default:
        return { primary: '#3776AB', secondary: '#FFD43B', glow: 'rgba(55,118,171,0.4)' };
    }
  };

  const colors = getMoodColors();

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Speech Bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mb-3 px-4 py-2 bg-slate-800/90 border-2 border-indigo-500/40 rounded-2xl shadow-xl backdrop-blur-md text-sm md:text-base font-semibold text-white text-center relative max-w-[240px]"
        >
          {message}
          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-800" />
        </motion.div>
      )}

      {/* Mascot Body */}
      <motion.div
        animate={
          mood === 'celebrating'
            ? { y: [0, -12, 0], rotate: [-4, 4, -4] }
            : mood === 'warning'
            ? { x: [-6, 6, -6, 6, 0] }
            : mood === 'thinking'
            ? { rotate: [0, 5, 0, -5, 0], y: [0, -4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === 'celebrating' ? 0.9 : 2.6,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]}`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0.9" />
            </radialGradient>
            <linearGradient id="pythonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4B8BBE" />
              <stop offset="100%" stopColor="#306998" />
            </linearGradient>
            <linearGradient id="pythonYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE873" />
              <stop offset="100%" stopColor="#FFD43B" />
            </linearGradient>
          </defs>

          {/* Shadow underneath */}
          <ellipse cx="100" cy="185" rx="55" ry="12" fill="rgba(0,0,0,0.3)" />

          {/* Coiled lower body (Python Style) */}
          <path
            d="M 50 160 C 30 140, 30 110, 60 110 C 90 110, 110 140, 150 140 C 175 140, 185 160, 150 175 C 100 190, 60 180, 50 160 Z"
            fill="url(#pythonBlue)"
          />

          {/* Yellow coil accent */}
          <path
            d="M 80 155 C 110 155, 140 165, 160 150 C 145 130, 110 135, 80 155 Z"
            fill="url(#pythonYellow)"
          />

          {/* Head */}
          <circle cx="100" cy="85" r="50" fill="url(#pythonBlue)" />
          {/* Head yellow belly patch */}
          <path
            d="M 75 90 C 85 125, 115 125, 125 90 Z"
            fill="url(#pythonYellow)"
            opacity="0.95"
          />

          {/* Tongue */}
          <motion.path
            d="M 100 120 Q 95 140 90 148 M 100 120 Q 105 140 110 148"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 100 120 Q 98 135 94 142 M 100 120 Q 102 135 106 142',
                'M 100 120 Q 95 146 88 155 M 100 120 Q 105 146 112 155',
                'M 100 120 Q 98 135 94 142 M 100 120 Q 102 135 106 142',
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />

          {/* Eyes Base */}
          <ellipse cx="80" cy="75" rx="14" ry="17" fill="white" />
          <ellipse cx="120" cy="75" rx="14" ry="17" fill="white" />

          {/* Pupils */}
          {mood === 'celebrating' ? (
            // Star Eyes for victory / correct
            <>
              <text x="73" y="82" fontSize="18" fill="#eab308">★</text>
              <text x="113" y="82" fontSize="18" fill="#eab308">★</text>
            </>
          ) : mood === 'sad' || mood === 'warning' ? (
            // Sad / Worried Eyes
            <>
              <ellipse cx="80" cy="78" rx="8" ry="9" fill="#1e293b" />
              <ellipse cx="120" cy="78" rx="8" ry="9" fill="#1e293b" />
              <path d="M 68 62 Q 80 57 90 64" stroke="#475569" strokeWidth="3" fill="none" />
              <path d="M 110 64 Q 120 57 132 62" stroke="#475569" strokeWidth="3" fill="none" />
              {/* Sweat drop */}
              <circle cx="138" cy="68" r="4" fill="#38bdf8" />
            </>
          ) : mood === 'thinking' ? (
            // Thinking Eyes looking up
            <>
              <ellipse cx="84" cy="70" rx="8" ry="9" fill="#1e293b" />
              <ellipse cx="124" cy="70" rx="8" ry="9" fill="#1e293b" />
              <circle cx="86" cy="67" r="3" fill="white" />
              <circle cx="126" cy="67" r="3" fill="white" />
            </>
          ) : (
            // Happy Cute Eyes
            <>
              <ellipse cx="80" cy="75" rx="8" ry="10" fill="#0f172a" />
              <ellipse cx="120" cy="75" rx="8" ry="10" fill="#0f172a" />
              {/* Catchlights */}
              <circle cx="77" cy="72" r="3" fill="white" />
              <circle cx="117" cy="72" r="3" fill="white" />
            </>
          )}

          {/* Cheeks Blush */}
          <circle cx="68" cy="92" r="7" fill="#f43f5e" opacity="0.4" />
          <circle cx="132" cy="92" r="7" fill="#f43f5e" opacity="0.4" />

          {/* Cute Smile / Mouth */}
          {mood === 'warning' || mood === 'sad' ? (
            <path d="M 88 108 Q 100 98 112 108" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 88 100 Q 100 114 112 100" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          )}

          {/* Python Yellow Dot on Head */}
          <circle cx="100" cy="46" r="4" fill="#FFD43B" />

          {/* Cool Sunglasses for high scores/cool mood */}
          {mood === 'cool' && (
            <g>
              <rect x="66" y="65" width="28" height="20" rx="4" fill="#0f172a" />
              <rect x="106" y="65" width="28" height="20" rx="4" fill="#0f172a" />
              <line x1="94" y1="74" x2="106" y2="74" stroke="#0f172a" strokeWidth="4" />
              <line x1="68" y1="68" x2="84" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
              <line x1="108" y1="68" x2="124" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};

