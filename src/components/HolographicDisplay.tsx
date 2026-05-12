import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Cpu, GitMerge, Layers, Search, Zap, Activity } from 'lucide-react';

interface HolographicDisplayProps {
  type: 'logic' | 'model' | 'dissection' | 'formula';
  data: any;
}

export const HolographicDisplay = ({ type, data }: HolographicDisplayProps) => {
  return (
    <div className="relative w-full min-h-[400px] flex items-center justify-center p-8 bg-[#000000]/40 rounded-[4rem] border border-white/5 shadow-spatial overflow-hidden group">
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-blue/5 to-transparent h-full w-full animate-pulse pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-nexus-blue/20 animate-hologram-scan pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 0.3, 0],
              x: Math.sin(i) * 20
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute bottom-0 w-1 h-1 bg-nexus-blue rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Content Rendering */}
      <div className="relative z-10 w-full max-w-4xl">
        {type === 'logic' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {data.steps.map((step: string, i: number) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 glass-premium rounded-[2.5rem] border-nexus-blue/20 shadow-hologram flex flex-col items-center gap-4 group/item"
                >
                  <div className="w-12 h-12 rounded-2xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 group-hover/item:rotate-12 transition-transform">
                     <Cpu size={24} className="text-nexus-blue" />
                  </div>
                  <span className="font-black text-xl uppercase italic tracking-tight text-white/90">{step}</span>
                </motion.div>
                {i < data.steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-nexus-blue hidden md:block"
                  >
                    <GitMerge size={32} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {type === 'model' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.sides.map((side: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-10 glass-premium rounded-[3rem] border border-white/10 relative overflow-hidden group/side"
              >
                <div className={`absolute inset-0 opacity-5 ${side.color}`} />
                <div className="flex items-center gap-4 mb-6">
                   <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${side.color}`}>
                      <Layers size={20} />
                   </div>
                   <h5 className={`font-black text-xs uppercase tracking-[0.4em] ${side.color}`}>{side.label}</h5>
                </div>
                <p className="text-3xl text-white font-bold italic leading-tight group-hover/side:text-nexus-blue transition-colors">
                  {side.content}
                </p>
                <div className="mt-8 flex gap-2">
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, delay: i * 0.5 }}
                        className={`h-full ${side.color.replace('text', 'bg')}`}
                      />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {type === 'dissection' && (
          <div className="flex flex-wrap items-end justify-center gap-6">
            {data.parts.map((p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`px-10 py-6 rounded-3xl bg-[#000000]/60 border-2 border-white/5 shadow-2xl relative group/word`}
                >
                  <div className={`absolute inset-0 blur-xl opacity-0 group-hover/word:opacity-30 transition-opacity ${p.color.replace('text', 'bg')}`} />
                  <span className={`text-4xl font-black italic tracking-tighter ${p.color}`}>{p.word}</span>
                </motion.div>
                <div className="flex flex-col items-center gap-3">
                   <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] font-mono">{p.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {type === 'formula' && (
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-16 glass-premium rounded-[4rem] border-nexus-blue/20 shadow-hologram relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-nexus-blue/5 animate-glow-pulse" />
                    <span className="relative z-10 text-5xl md:text-7xl font-mono font-black text-nexus-blue tracking-[0.2em] filter drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] uppercase">
                        {data.content}
                    </span>
                    <div className="mt-10 flex items-center justify-center gap-4 text-white/20">
                        <Activity size={16} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Encryption Verified</span>
                    </div>
                </motion.div>
            </div>
        )}
      </div>

      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-nexus-blue/30 rounded-tl-[4rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-nexus-blue/30 rounded-tr-[4rem] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-nexus-blue/30 rounded-bl-[4rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-nexus-blue/30 rounded-br-[4rem] pointer-events-none" />
    </div>
  );
};
