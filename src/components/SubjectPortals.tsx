import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CASE_FILES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const SUBJECT_CONFIGS: Record<string, { label: string; secondary: string }> = {
    math: { label: 'Logic Core', secondary: 'Pattern Recognition' },
    russian: { label: 'Code Bureau', secondary: 'Semantic Analysis' },
    history: { label: 'Time Archive', secondary: 'Causal Tracking' },
    english: { label: 'Global Link', secondary: 'Neural Translation' },
    literature: { label: 'Mind Archive', secondary: 'Archetype Scan' }
};

export const SubjectPortals = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const progression = useUserStore((state) => state.subjectsProgression);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 p-4 md:p-0 overflow-y-auto max-h-[70vh] hide-scrollbar w-full">
      {CASE_FILES.map((subject, index) => {
        const Icon = (LucideIcons as any)[subject.icon] || LucideIcons.Book;
        const progress = progression[subject.id] || 0;
        const config = SUBJECT_CONFIGS[subject.id] || { label: 'Archive', secondary: 'Scanning...' };

        return (
          <motion.button
            key={subject.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: index * 0.1,
                type: 'spring',
                damping: 20,
                stiffness: 100
            }}
            whileHover={{ scale: 1.05, y: -15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(subject.id)}
            className="glass-premium p-10 rounded-[3.5rem] flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px] border border-white/5 shadow-premium"
          >
            {/* Subject Specific Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-1000 blur-3xl"
              style={{ backgroundColor: subject.color }}
            />

            <div
              className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 transition-all duration-1000 group-hover:scale-110 shadow-2xl relative"
              style={{ backgroundColor: `${subject.color}15`, border: `1px solid ${subject.color}33` }}
            >
              <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon size={48} style={{ color: subject.color }} className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />

              {/* Spinning Ring */}
              <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-[2.5rem] animate-spin-slow group-hover:border-white/20 transition-colors" />
            </div>

            <div className="text-center space-y-2 mb-8">
               <span className="text-sm font-black text-white/90 uppercase tracking-[0.3em] italic leading-none">{subject.name}</span>
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">{config.label}</span>
                  <span className="text-[7px] font-black text-white/10 uppercase tracking-[0.4em] group-hover:text-white/20 transition-colors">{config.secondary}</span>
               </div>
            </div>

            <div className="w-full mt-auto space-y-3">
              <div className="flex justify-between items-center px-2">
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: subject.color }} />
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Synergy</span>
                 </div>
                 <span className="text-[11px] font-black text-white/40 italic font-mono">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full transition-all duration-1000 relative"
                  style={{ backgroundColor: subject.color }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10 rounded-br-lg" />
          </motion.button>
        );
      })}
    </div>
  );
};
