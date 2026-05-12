import React from 'react';
import { motion } from 'framer-motion';
import { CASE_FILES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export const SubjectPortals = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const progression = useUserStore((state) => state.subjectsProgression);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 md:p-0 overflow-y-auto max-h-[50vh] hide-scrollbar w-full">
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
            className="glass-card p-6 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group min-h-[160px]"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ backgroundColor: subject.color }}
            />

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg"
              style={{ backgroundColor: `${subject.color}15`, border: `1px solid ${subject.color}33` }}
            >
              <Icon size={32} style={{ color: subject.color }} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </div>

            <span className="text-[10px] font-black text-white/90 uppercase tracking-tighter text-center leading-tight">{subject.name}</span>

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
