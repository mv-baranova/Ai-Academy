import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Award, Shield, Zap, Activity, Target, BookOpen, Clock, Activity as ActivityIcon, Star, ChevronRight, ZapOff, Brain } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface ProfileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDashboard = ({ isOpen, onClose }: ProfileDashboardProps) => {
  const { username, level, xp, rank, role, streak, artifacts, titles, subjectsProgression } = useUserStore();

  const stats = [
    { label: 'Уровень', value: level, icon: Zap, color: 'text-amber-400' },
    { label: 'Опыт', value: xp, icon: ActivityIcon, color: 'text-nexus-blue' },
    { label: 'Ударный режим', value: `${streak} дн.`, icon: Star, color: 'text-nexus-gold' },
  ];

  const totalProgress = Object.values(subjectsProgression).reduce((acc, curr) => acc + curr, 0);
  const avgProgress = Object.keys(subjectsProgression).length > 0 ? totalProgress / Object.keys(subjectsProgression).length : 0;

  const getAnalysisText = () => {
    if (avgProgress === 0) return "Твой путь в Ордене только начинается. Выбери архив и начни свое первое расследование.";
    if (avgProgress < 30) return "Ты делаешь первые успехи. Твой разум гибок, а любопытство ведет тебя к истине. Продолжай исследовать!";
    if (avgProgress < 70) return "Впечатляющий прогресс! Твой аналитический склад ума позволяет щелкать дела как орехи. Ты становишься легендой Ордена.";
    return "Невероятно! Твои знания практически безграничны. Ты видишь структуру мира там, где другие видят хаос. Настоящий Магистр.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[150] w-full md:w-[600px] bg-[#050505] flex flex-col border-r border-white/10 shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-purple via-nexus-blue to-nexus-purple opacity-50" />
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-4xl bg-nexus-purple/10 flex items-center justify-center border border-nexus-purple/30 shadow-nexus-neon-purple">
                  <User size={40} className="text-nexus-purple" />
                </div>
                <div>
                  <h2 className="font-black text-3xl uppercase italic tracking-tighter leading-none">{username}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-nexus-purple font-black uppercase tracking-[0.3em]">{rank}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">{role}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12 hide-scrollbar">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-premium p-6 rounded-4xl border border-white/5 text-center space-y-3 shadow-premium">
                    <stat.icon className={`mx-auto ${stat.color}`} size={24} />
                    <div className="text-2xl font-black italic">{stat.value}</div>
                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Subject Mastery */}
              <div className="space-y-6">
                 <h4 className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] px-4">
                    <Activity size={16} /> Мастерство по предметам
                 </h4>
                 <div className="space-y-4">
                    {Object.entries(subjectsProgression).length > 0 ? (
                       Object.entries(subjectsProgression).map(([id, progress]) => (
                          <div key={id} className="glass-premium p-6 rounded-3xl border border-white/5 shadow-premium">
                             <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-black uppercase italic tracking-wider text-white/80">{id}</span>
                                <span className="text-xs font-black text-nexus-blue">{progress}%</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                   initial={{ width: 0 }}
                                   animate={{ width: `${progress}%` }}
                                   className="h-full bg-nexus-blue shadow-nexus-neon"
                                />
                             </div>
                          </div>
                       ))
                    ) : (
                       <div className="p-8 text-center text-white/20 italic text-sm">Исследования еще не начаты</div>
                    )}
                 </div>
              </div>

              {/* Artifacts & Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h4 className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] px-4">
                       <Shield size={16} /> Артефакты
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                       {[...Array(6)].map((_, i) => (
                          <div key={i} className={`aspect-square rounded-2xl border flex items-center justify-center transition-all ${
                             artifacts[i] ? 'bg-nexus-gold/10 border-nexus-gold/30 text-nexus-gold shadow-[0_0_15px_rgba(255,184,0,0.2)]' : 'bg-white/5 border-white/5 text-white/5'
                          }`}>
                             {artifacts[i] ? <Star size={24} fill="currentColor" /> : <ZapOff size={24} />}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h4 className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] px-4">
                       <Award size={16} /> Титулы
                    </h4>
                    <div className="space-y-3">
                       {titles.map((title, i) => (
                          <div key={i} className="glass-premium py-3 px-5 rounded-2xl border border-nexus-blue/20 text-nexus-blue text-[10px] font-black uppercase tracking-widest text-center italic shadow-nexus-neon">
                             {title}
                          </div>
                       ))}
                       {titles.length === 0 && <div className="text-white/10 text-[10px] text-center italic">Титулы не получены</div>}
                    </div>
                 </div>
              </div>

              {/* Dynamic Logic Analysis */}
              <div className="glass-premium p-10 rounded-5xl border border-white/5 space-y-6 shadow-premium relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Brain size={100} className="text-nexus-blue" />
                 </div>
                 <h4 className="text-[10px] font-black text-nexus-blue uppercase tracking-[0.4em]">Когнитивный анализ</h4>
                 <p className="text-xl text-white/80 leading-relaxed font-medium italic">
                    {getAnalysisText()}
                 </p>
                 <div className="flex gap-3">
                    <div className="px-3 py-1 bg-nexus-blue/10 border border-nexus-blue/30 rounded-lg text-[8px] font-black text-nexus-blue uppercase tracking-widest">
                       {avgProgress > 50 ? 'Аналитик' : 'Искатель'}
                    </div>
                    <div className="px-3 py-1 bg-nexus-purple/10 border border-nexus-purple/30 rounded-lg text-[8px] font-black text-nexus-purple uppercase tracking-widest">
                       {streak > 5 ? 'Стратег' : 'Новичок'}
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
