import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  ArrowLeft,
  Calendar,
  AlertCircle,
  Trash2,
  Sparkles,
  Search
} from 'lucide-react';
import { LeaderboardEntry } from '../../types/quiz';
import { soundFx } from '../../utils/sound';

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
  onClear?: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  entries,
  onBack,
  onClear,
}) => {
  const [search, setSearch] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');

  const filtered = entries.filter((e) => {
    const matchesName = e.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = filterGrade === 'all' || e.grade === filterGrade;
    return matchesName && matchesGrade;
  });

  const top1 = filtered[0];
  const top2 = filtered[1];
  const top3 = filtered[2];
  const rest = filtered.slice(3);

  const formatSeconds = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (isoString: string): string => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-[85vh] py-6 px-4 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="p-2.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 font-bold text-sm transition flex items-center gap-2 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-400" />
            Hall of Fame
          </h1>
        </div>

        {onClear && entries.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the local leaderboard records?')) {
                onClear();
              }
            }}
            className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
            title="Clear Leaderboard"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* LocalStorage Notice Banner (Mandatory from Instructions) */}
      <div className="mb-6 p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-indigo-200">
        <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Device Storage Notice:</span> Rankings are securely saved in this web browser&apos;s LocalStorage. They are stored locally on this machine and are not synced across other computers.
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student hero name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'Grade 4', 'Grade 5', 'Grade 6'].map((g) => (
            <button
              key={g}
              onClick={() => {
                soundFx.playClick();
                setFilterGrade(g);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                filterGrade === g
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g === 'all' ? 'All Grades' : g}
            </button>
          ))}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl">
          <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-300 mb-1">No heroes recorded yet!</h3>
          <p className="text-sm text-slate-500">
            Be the very first Python hero to complete the challenge and take the crown!
          </p>
        </div>
      ) : (
        <>
          {/* Animated Podium for Top 3 */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end mb-8 pt-8">
            {/* 2nd Place (Silver) */}
            <div className="flex flex-col items-center order-1">
              {top2 ? (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center shadow-lg mb-2">
                    <span className="text-lg">🥈</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white text-center truncate max-w-full">
                    {top2.studentName}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 mb-2">
                    {top2.score} pts
                  </span>
                  <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700 border-t-4 border-slate-400 rounded-t-2xl p-3 h-28 flex flex-col justify-center items-center shadow-lg">
                    <span className="text-xs font-black text-slate-300">2nd Place</span>
                    <span className="text-[11px] text-slate-400">{top2.grade}</span>
                    <span className="text-[11px] text-slate-400 font-mono mt-1">
                      {formatSeconds(top2.completionTimeSeconds)}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="h-28 w-full bg-slate-900/30 rounded-t-2xl border-t border-slate-800 flex items-center justify-center text-xs text-slate-600">
                  Empty
                </div>
              )}
            </div>

            {/* 1st Place (Gold) */}
            <div className="flex flex-col items-center order-2">
              {top1 ? (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 border-4 border-yellow-200 flex items-center justify-center shadow-2xl mb-2 relative">
                    <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-spin" />
                    <span className="text-2xl">🥇</span>
                  </div>
                  <span className="text-sm sm:text-base font-black text-yellow-300 text-center truncate max-w-full">
                    {top1.studentName}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mb-2">
                    {top1.score} pts ({top1.percentage}%)
                  </span>
                  <div className="w-full bg-gradient-to-t from-amber-600/40 via-yellow-500/30 to-amber-500/50 border-t-4 border-yellow-400 rounded-t-2xl p-3 h-36 flex flex-col justify-center items-center shadow-2xl">
                    <span className="text-sm font-black text-yellow-300">1st Place</span>
                    <span className="text-xs font-bold text-amber-200">{top1.grade}</span>
                    <span className="text-xs text-amber-200 font-mono mt-1">
                      {formatSeconds(top1.completionTimeSeconds)}
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="flex flex-col items-center order-3">
              {top3 ? (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-700 border-2 border-amber-600 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-lg">🥉</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white text-center truncate max-w-full">
                    {top3.studentName}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 mb-2">
                    {top3.score} pts
                  </span>
                  <div className="w-full bg-gradient-to-t from-slate-800 to-amber-900/30 border-t-4 border-amber-600 rounded-t-2xl p-3 h-24 flex flex-col justify-center items-center shadow-lg">
                    <span className="text-xs font-black text-amber-500">3rd Place</span>
                    <span className="text-[11px] text-slate-400">{top3.grade}</span>
                    <span className="text-[11px] text-slate-400 font-mono mt-1">
                      {formatSeconds(top3.completionTimeSeconds)}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="h-24 w-full bg-slate-900/30 rounded-t-2xl border-t border-slate-800 flex items-center justify-center text-xs text-slate-600">
                  Empty
                </div>
              )}
            </div>
          </div>

          {/* Remaining Students Table */}
          {rest.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3.5 bg-slate-800/80 border-b border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-300">
                Other Challengers
              </div>
              <div className="divide-y divide-slate-800">
                {rest.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:px-5 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-slate-800/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 text-center font-bold text-slate-500">
                        #{idx + 4}
                      </span>
                      <div>
                        <div className="font-bold text-white">{item.studentName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span>{item.grade}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.completedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="font-black text-amber-400">{item.score} pts</div>
                        <div className="text-[11px] text-slate-400">{item.percentage}%</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-slate-400 font-mono text-xs">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        {formatSeconds(item.completionTimeSeconds)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
