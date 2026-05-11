import React from 'react';
import { motion } from 'framer-motion';
import { SUBJECTS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export const SubjectPortals = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const progression = useUserStore((state) => state.subjectsProgression);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 overflow-y-auto max-h-[40vh] w-full">
      {SUBJECTS.map((subject) => {
        const Icon = (LucideIcons as any)[subject.icon];
        const progress = progression[subject.id] || 0;

        return (
          <motion.button
            key={subject.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(subject.id)}
            className="glass p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: subject.color }}
            />
            <Icon size={32} style={{ color: subject.color }} className="mb-2" />
            <span className="text-xs font-medium text-white/90">{subject.name}</span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: subject.color }}
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
