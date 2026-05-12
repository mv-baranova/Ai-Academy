import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const SubjectCard = ({ subject, index, onSelect }: any) => {
    const progression = useUserStore((state) => state.subjectsProgression);
    const progress = progression[subject.id] || 0;
    const config = SUBJECT_CONFIGS[subject.id] || { label: 'Archive', secondary: 'Scanning...' };
    const Icon = (LucideIcons as any)[subject.icon] || LucideIcons.Book;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    damping: 20,
                    stiffness: 100
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(subject.id)}
                className="glass-premium p-10 rounded-[4rem] flex flex-col items-center justify-center relative overflow-hidden min-h-[350px] border border-white/5 shadow-spatial group"
            >
                {/* 3D Depth Layer: Background Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-1000 blur-[80px]"
                    style={{ backgroundColor: subject.color, transform: "translateZ(-50px)" }}
                />

                {/* 3D Depth Layer: Icon */}
                <div
                    className="w-28 h-24 rounded-[3rem] flex items-center justify-center mb-10 transition-all duration-1000 group-hover:scale-110 relative"
                    style={{
                        backgroundColor: `${subject.color}10`,
                        border: `1px solid ${subject.color}20`,
                        transform: "translateZ(50px)"
                    }}
                >
                    <div className="absolute inset-0 bg-white/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon size={56} style={{ color: subject.color }} className="relative z-10 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />

                    {/* Holographic Scanning Ring */}
                    <div className="absolute inset-0 border-[3px] border-dashed border-white/10 rounded-[3rem] animate-spin-slow group-hover:border-nexus-blue/30 transition-colors" />
                </div>

                {/* 3D Depth Layer: Text */}
                <div className="text-center space-y-3 mb-10" style={{ transform: "translateZ(30px)" }}>
                    <span className="text-lg font-black text-white uppercase italic tracking-[0.3em] leading-none block">{subject.name}</span>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-nexus-blue uppercase tracking-[0.6em] animate-hologram-flicker">{config.label}</span>
                        <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em] group-hover:text-white/30 transition-colors">{config.secondary}</span>
                    </div>
                </div>

                {/* 3D Depth Layer: Progress */}
                <div className="w-full mt-auto space-y-4" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex justify-between items-center px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: subject.color }} />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">SYNC</span>
                        </div>
                        <span className="text-[12px] font-mono font-black text-white/60 italic">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full rounded-full relative"
                            style={{ backgroundColor: subject.color }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Holographic UI bits */}
                <div className="absolute top-6 left-6 flex gap-1 opacity-20">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-4 h-1 bg-white rounded-full" />
                </div>
                <div className="absolute bottom-6 right-6 text-[8px] font-mono text-white/10 uppercase tracking-tighter">
                   REF: {subject.id.toUpperCase()}_0x{index}f
                </div>
            </motion.button>
        </motion.div>
    );
};

export const SubjectPortals = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="flex items-center gap-10 py-12 px-10 overflow-x-auto hide-scrollbar w-full snap-x snap-mandatory">
      {CASE_FILES.map((subject, index) => (
        <div key={subject.id} className="min-w-[320px] md:min-w-[380px] snap-center">
            <SubjectCard subject={subject} index={index} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
};
