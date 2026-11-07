import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Trophy, BookOpen, GraduationCap } from 'lucide-react';
import { HeartsDisplay } from '../security/HeartsDisplay';
import { GameMode } from '../../types/quiz';
import { soundFx } from '../../utils/sound';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  gameMode: GameMode;
  lives?: number;
  studentName?: string;
  grade?: string;
  onOpenLeaderboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  isFullscreen,
  onToggleFullscreen,
  gameMode,
  lives = 3,
  studentName,
  grade,
  onOpenLeaderboard,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-800/80 mb-4 select-none">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-yellow-400 p-0.5 shadow-lg flex items-center justify-center">
          <span className="text-xl">🐍</span>
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
            PyKids <span className="text-yellow-400 font-extrabold text-xs uppercase px-1.5 py-0.5 bg-yellow-400/10 rounded-md border border-yellow-400/20">Quiz</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
            Python If / Else / Elif Adventures
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

          {/* Security Lives (Only in Student Challenge Mode) */}
          {gameMode === 'student' && <HeartsDisplay lives={lives} />}

          {/* Teacher Mode Pill */}
          {gameMode === 'teacher' && (
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-2xl text-purple-300 text-xs font-black flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Teacher Mode</span>
            </div>
          )}
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {onOpenLeaderboard && (
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLeaderboard();
            }}
            className="p-2 sm:px-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl text-slate-300 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            title="Hall of Fame Leaderboard"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">Leaderboard</span>
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
