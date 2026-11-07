import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Trophy, GraduationCap, Languages } from 'lucide-react';
import { HeartsDisplay } from '../security/HeartsDisplay';
import { Language } from '../../types/quiz';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  lives?: number;
  studentName?: string;
  grade?: string;
  lang: Language;
  onToggleLanguage: () => void;
  onOpenLeaderboard?: () => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  isFullscreen,
  onToggleFullscreen,
  lives = 3,
  studentName,
  grade,
  lang,
  onToggleLanguage,
  onOpenLeaderboard,
  onHomeClick,
}) => {
  const t = translations[lang];

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-800/80 mb-4 select-none">
      {/* Brand Logo - Click to go Home */}
      <div
        onClick={() => {
          if (onHomeClick) {
            soundFx.playClick();
            onHomeClick();
          }
        }}
        className={`flex items-center gap-2.5 ${onHomeClick ? 'cursor-pointer group hover:opacity-90 active:scale-95 transition-all' : ''}`}
        title={onHomeClick ? t.homePage : t.appName}
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-yellow-400 p-0.5 shadow-lg flex items-center justify-center group-hover:shadow-indigo-500/25 transition-all">
          <span className="text-xl">🐍</span>
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
            {lang === 'ar' ? 'أبطال بايثون' : 'PyKids'}
            <span className="text-yellow-400 font-extrabold text-xs uppercase px-1.5 py-0.5 bg-yellow-400/10 rounded-md border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all">
              {lang === 'ar' ? 'تحدي' : 'Quiz'}
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
            {t.appSubtitle}
          </p>
        </div>
      </div>

      {/* Center badges: Student Info & Hearts */}
      {studentName && (
        <div className="flex items-center gap-2">
          {/* Student Profile Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="max-w-[100px] truncate">{studentName}</span>
            {grade && (
              <span className="px-1.5 py-0.5 bg-slate-700 rounded-md text-[10px] text-yellow-300 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                {grade}
              </span>
            )}
          </div>

          {/* Security Lives */}
          <HeartsDisplay lives={lives} maxLives={3} label={t.livesLabel} />
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Language Switcher Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleLanguage();
          }}
          className="px-2.5 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 rounded-xl text-indigo-200 text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
          title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Languages className="w-4 h-4 text-indigo-400" />
          <span className="font-extrabold">{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>

        {onOpenLeaderboard && (
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLeaderboard();
            }}
            className="p-2 sm:px-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl text-slate-300 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            title={t.leaderboardTitle}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">{lang === 'ar' ? 'المتصدرين' : 'Leaderboard'}</span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleMute();
          }}
          className={`p-2 rounded-xl border transition active:scale-95 ${
            isMuted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
              : 'bg-slate-800/90 border-slate-700/80 text-emerald-400 hover:bg-slate-700/90'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleFullscreen();
          }}
          className="p-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition active:scale-95"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
