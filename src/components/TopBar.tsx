import React from 'react';
import { useUserStore } from '../store/useUserStore';
import { motion } from 'framer-motion';
import { Trophy, Zap, ShieldCheck } from 'lucide-react';

export const TopBar = () => {
  const { level, xp, tokens } = useUserStore();
  const xpToNext = level * 1000;
  const progressToNext = (xp / xpToNext) * 100;

  return (
    <div className="fixed top-0 left-0 w-full p-4 md:p-6 z-[100] flex items-center justify-between pointer-events-none">
      <div className="flex gap-3 pointer-events-auto">
        <div className="glass-premium px-4 py-2 rounded-2xl flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-nexus-purple flex items-center justify-center font-black text-lg shadow-nexus-neon-purple">
              {level}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <ShieldCheck size={12} className="text-nexus-purple" fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col min-w-[80px]">
            <div className="flex justify-between text-[10px] text-white/40 uppercase font-black tracking-tighter mb-1">
              <span>Прогресс</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                className="h-full bg-gradient-to-r from-nexus-purple to-nexus-blue"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pointer-events-auto">
        <div className="glass-premium px-4 py-2 rounded-2xl flex items-center gap-2">
          <Zap size={16} className="text-nexus-blue" fill="currentColor" />
          <span className="text-white font-black">{tokens}</span>
        </div>
        <div className="glass-premium px-4 py-2 rounded-2xl flex items-center gap-2">
          <Trophy size={16} className="text-nexus-gold" fill="currentColor" />
          <span className="text-white font-black">{xp}</span>
        </div>
      </div>
    </div>
  );
};
