import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Award, User, Zap, Activity, Shield, Star, Crown } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Leaderboard = ({ isOpen, onClose }: LeaderboardProps) => {
  const { username, level, xp } = useUserStore();

  const MOCK_LEADERS = [
    { name: 'Архивариус_01', xp: 12450, rank: 'Магистр', role: 'Хранитель знаний' },
    { name: 'Logos_Prime', xp: 10200, rank: 'Аналитик', role: 'Мастер логики' },
    { name: 'Socrat88', xp: 9800, rank: 'Аналитик', role: 'Следователь смыслов' },
    { name: 'Neo_Seeker', xp: 8500, rank: 'Искатель', role: 'Лингвист-разведчик' },
    { name: username || 'Ты', xp: xp + (level * 1000), rank: 'Искатель', role: 'Следователь смыслов', isUser: true },
    { name: 'Mystery_D', xp: 7200, rank: 'Искатель', role: 'Архивариус' },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-[150] h-[85vh] bg-[#050505] rounded-t-6xl border-t border-white/10 shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-gold via-nexus-blue to-nexus-gold opacity-50 shadow-[0_0_20px_rgba(255,184,0,0.3)]" />
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-nexus-gold/10 flex items-center justify-center border border-nexus-gold/30 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                  <Trophy size={32} className="text-nexus-gold" />
                </div>
                <div>
                  <h2 className="font-black text-3xl uppercase italic tracking-tighter leading-none">Рейтинг <span className="text-nexus-gold">Ордена</span></h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mt-2">Глобальное соревнование Искателей</p>
                </div>
              </div>
              <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 hide-scrollbar bg-gradient-to-b from-transparent to-nexus-gold/5">
              {MOCK_LEADERS.map((leader, i) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-premium p-6 md:p-8 rounded-4xl border flex items-center justify-between group transition-all ${
                    leader.isUser
                      ? 'border-nexus-blue bg-nexus-blue/10 shadow-nexus-neon'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl italic ${
                      i === 0 ? 'bg-nexus-gold text-black shadow-[0_0_20px_#ffb800]' :
                      i === 1 ? 'bg-slate-300 text-black' :
                      i === 2 ? 'bg-amber-700 text-black' :
                      'bg-white/5 text-white/40'
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                         <span className={`font-black text-xl md:text-2xl uppercase italic tracking-tight ${leader.isUser ? 'text-nexus-blue' : 'text-white'}`}>
                            {leader.name}
                         </span>
                         {i === 0 && <Crown size={16} className="text-nexus-gold animate-bounce" />}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-nexus-purple font-black uppercase tracking-widest">{leader.rank}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{leader.role}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black italic ${leader.isUser ? 'text-nexus-blue' : 'text-white/60'}`}>{leader.xp.toLocaleString()}</div>
                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest">Очков Опыта</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
