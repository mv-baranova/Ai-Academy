import React from 'react';
import { useUserStore } from '../store/useUserStore';
import { motion } from 'framer-motion';
import { Trophy, Zap, ShieldCheck, Crown } from 'lucide-react';

export const TopBar = () => {
  const { level, xp, tokens, isPremium, rank } = useUserStore();
  const xpToNext = level * 1000;
  const progressToNext = (xp / xpToNext) * 100;

  return (
    <div className="fixed top-0 left-0 w-full p-4 md:p-6 z-[100] flex items-center justify-between pointer-events-none">
      <div className="flex gap-3 pointer-events-auto">
        <div className="glass-premium px-4 py-2 rounded-2xl flex items-center gap-4 border border-white/10 shadow-premium">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-nexus-neon ${
              isPremium ? 'bg-nexus-gold text-black' : 'bg-nexus-purple text-white shadow-nexus-neon-purple'
            }`}>
              {level}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#050505] rounded-full p-1 border border-white/10">
              {isPremium ? (
                <Crown size={12} className="text-nexus-gold" fill="currentColor" />
              ) : (
                <ShieldCheck size={12} className="text-nexus-purple" fill="currentColor" />
              )}
            </div>
          </div>
          <div className="flex flex-col min-w-[100px]">
            <div className="flex justify-between text-[9px] text-white/40 uppercase font-black tracking-widest mb-1.5">
              <span>{rank}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                className={`h-full rounded-full ${
                  isPremium ? 'bg-gradient-to-r from-nexus-gold to-yellow-300' : 'bg-gradient-to-r from-nexus-purple to-nexus-blue'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pointer-events-auto">
        <div className="glass-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/10 shadow-premium hover:border-nexus-blue/50 transition-colors group">
          <Zap size={18} className="text-nexus-blue group-hover:animate-pulse" fill="currentColor" />
          <div className="flex flex-col items-start leading-none">
             <span className="text-white font-black text-lg">{tokens}</span>
             <span className="text-[8px] text-white/30 uppercase font-black tracking-tighter">Токены</span>
          </div>
        </div>
        <div className="glass-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/10 shadow-premium hover:border-nexus-gold/50 transition-colors group">
          <Trophy size={18} className="text-nexus-gold group-hover:scale-110 transition-transform" fill="currentColor" />
          <div className="flex flex-col items-start leading-none">
             <span className="text-white font-black text-lg">{xp}</span>
             <span className="text-[8px] text-white/30 uppercase font-black tracking-tighter">Опыт</span>
          </div>
        </div>
      </div>
    </div>
  );
};
