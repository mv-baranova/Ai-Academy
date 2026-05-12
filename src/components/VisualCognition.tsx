import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, GitMerge, Layers, Repeat } from 'lucide-react';

export const LogicChain = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-10 w-full">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="glass-premium p-8 rounded-4xl border border-white/10 shadow-premium flex items-center justify-center min-w-[180px] text-center"
        >
          <span className="font-black text-xl uppercase italic tracking-tight text-white/90">{step}</span>
        </motion.div>
        {i < steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 + 0.1 }}
            className="text-nexus-blue"
          >
            <ArrowRight size={32} className="rotate-90 md:rotate-0" />
          </motion.div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const MentalModel = ({ title, sides }: { title: string; sides: { label: string, content: string, color: string }[] }) => (
  <div className="space-y-10 w-full">
    <div className="text-center">
       <span className="text-[10px] font-black text-nexus-blue uppercase tracking-[0.5em]">{title}</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sides.map((side, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group`}
        >
          <div className={`absolute inset-0 opacity-5 ${side.color}`} />
          <h5 className={`font-black text-sm uppercase tracking-[0.3em] mb-6 ${side.color}`}>{side.label}</h5>
          <p className="text-2xl text-white/90 font-medium italic leading-tight">{side.content}</p>
        </motion.div>
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-16 h-16 rounded-full bg-[#050505] border border-white/10 items-center justify-center z-10 text-white/20 font-black italic">VS</div>
    </div>
  </div>
);

export const SentenceDissection = ({ parts }: { parts: { word: string, role: string, color: string }[] }) => (
  <div className="flex flex-wrap items-end justify-center gap-4 py-12 w-full">
    {parts.map((p, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className={`px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-3xl font-black italic tracking-tighter ${p.color}`}>
          {p.word}
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-px h-6 bg-white/20" />
           <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{p.role}</span>
        </div>
      </motion.div>
    ))}
  </div>
);
