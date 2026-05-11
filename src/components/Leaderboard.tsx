import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, ShieldCheck } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  username: string;
  rank: string;
  xp: number;
  isMe?: boolean;
}

export const Leaderboard = () => {
  const users: LeaderboardUser[] = [
    { id: '1', username: 'Мастер_Архивов', rank: 'Мудрец', xp: 25400 },
    { id: '2', username: 'QuantumFinder', rank: 'Мастер', xp: 18200 },
    { id: '3', username: 'История_Рядом', rank: 'Мастер', xp: 15600 },
    { id: '4', username: 'Логик_ИИ', rank: 'Странник', xp: 12100 },
    { id: '5', username: 'Alex_Seeker', rank: 'Странник', xp: 9800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-black uppercase italic tracking-tighter">Совет <span className="text-nexus-gold">Лучших</span></h3>
        <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Сезон 1: Инициация</span>
      </div>

      <div className="space-y-3">
        {users.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-premium p-5 rounded-3xl border flex items-center gap-4 ${
              idx === 0 ? 'border-nexus-gold shadow-[0_0_20px_rgba(255,184,0,0.2)]' : 'border-white/5'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${
              idx === 0 ? 'bg-nexus-gold text-black' :
              idx === 1 ? 'bg-slate-400 text-black' :
              idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/5 text-white/40'
            }`}>
              {idx + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{user.username}</span>
                {idx === 0 && <Crown size={14} className="text-nexus-gold" />}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-nexus-blue" />
                <span className="text-[10px] uppercase font-black text-white/30 tracking-widest">{user.rank}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-nexus-blue font-black tracking-tight">{user.xp.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-black text-white/20">XP</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
