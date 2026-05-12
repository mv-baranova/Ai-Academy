import React from 'react';
import { motion } from 'framer-motion';
import { CASE_FILES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export const SubjectPortals = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const progression = useUserStore((state) => state.subjectsProgression);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 md:p-0 w-full max-w-5xl mx-auto">
      {CASE_FILES.map((subject, index) => {
        const Icon = (LucideIcons as any)[subject.icon] || LucideIcons.Book;
        const progress = progression[subject.id] || 0;

        return (
          <motion.button
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(subject.id)}
            className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center relative overflow-hidden group min-h-[240px] border border-white/5 hover:border-white/20 transition-all duration-700"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at center, ${subject.color}33 0%, transparent 70%)` }}
            />

            <div
              className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-700 group-hover:scale-110 shadow-2xl relative"
              style={{ backgroundColor: `${subject.color}10`, border: `1px solid ${subject.color}44` }}
            >
              <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: subject.color }} />
              <Icon size={48} style={{ color: subject.color }} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] relative z-10" />
            </div>

            <span className="text-xl font-black text-white uppercase italic tracking-tighter text-center leading-none mb-2">{subject.name}</span>
            <span className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">Архив открыт</span>

            <div className="w-full mt-4 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full transition-all duration-1000"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
              <span className="text-[10px] font-bold text-white/30">{progress}%</span>
            </div>

            <div
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full opacity-10 blur-xl"
              style={{ backgroundColor: subject.color }}
            />
          </motion.button>
        );
      })}
    </div>
  );
};
