import React from 'react';
import { useUserStore } from '../store/useUserStore';
import { motion } from 'framer-motion';

export const TopBar = () => {
  const { level, xp, tokens } = useUserStore();
  const progressToNext = (xp / (level * 1000)) * 100;

  return (
    <div className="fixed top-0 left-0 w-full p-4 z-50 flex items-center justify-between">
      <div className="glass px-4 py-2 rounded-full flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-nexus-purple flex items-center justify-center font-bold">
          {level}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 uppercase tracking-wider">Уровень</span>
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              className="h-full bg-nexus-blue"
            />
          </div>
        </div>
      </div>

      <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
        <span className="text-nexus-blue font-bold">{tokens}</span>
        <span className="text-xs text-white/50">💎</span>
      </div>
    </div>
  );
};
