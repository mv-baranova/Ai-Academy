import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, Brain, Target, BookOpen, ChevronRight, Zap, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface ParentAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentAnalytics = ({ isOpen, onClose }: ParentAnalyticsProps) => {
  const { username, subjectsProgression, level, xp } = useUserStore();

  const metrics = [
    { label: 'Логика', value: 78, color: 'text-nexus-blue' },
    { label: 'Крит. мышление', value: 65, color: 'text-nexus-purple' },
    { label: 'Внимательность', value: 82, color: 'text-emerald-400' },
    { label: 'Словарный запас', value: 72, color: 'text-amber-400' },
  ];

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
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="fixed inset-y-0 right-0 z-[150] w-full md:w-[650px] bg-[#050505] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-nexus-blue to-emerald-400 opacity-50" />
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-400/10 flex items-center justify-center border border-emerald-400/30">
                  <Shield size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="font-black text-3xl uppercase italic tracking-tighter leading-none">Контроль <span className="text-emerald-400">Прогресса</span></h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mt-2">Аналитический отчет для родителей</p>
                </div>
              </div>
              <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12 hide-scrollbar">
              {/* Skill Matrix */}
              <div className="space-y-6">
                 <h4 className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] px-4">
                    <Brain size={16} /> Когнитивная Матрица
                 </h4>
                 <div className="grid grid-cols-2 gap-4">
                    {metrics.map((m) => (
                       <div key={m.label} className="glass-premium p-6 rounded-4xl border border-white/5 shadow-premium">
                          <div className="flex justify-between items-center mb-4">
                             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{m.label}</span>
                             <span className={`text-xl font-black italic ${m.color}`}>{m.value}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${m.value}%` }}
                                className={`h-full bg-current ${m.color}`}
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Learning Dynamics */}
              <div className="glass-premium p-10 rounded-5xl border border-white/5 space-y-8 shadow-premium relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <TrendingUp size={100} className="text-emerald-400" />
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-2">Динамика обучения</h4>
                       <p className="text-2xl font-black text-white uppercase italic tracking-tight">Положительный тренд</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center border border-emerald-400/30">
                       <CheckCircle2 size={24} className="text-emerald-400" />
                    </div>
                 </div>
                 <p className="text-lg text-white/60 leading-relaxed font-medium italic">
                    {username} проявляет высокую активность в изучении математической логики. Среднее время на решение одного кейса сократилось на 15% за последнюю неделю.
                 </p>
              </div>

              {/* Subject Breakdown */}
              <div className="space-y-6">
                 <h4 className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] px-4">
                    <Activity size={16} /> Академический профиль
                 </h4>
                 <div className="space-y-4">
                    {Object.entries(subjectsProgression).map(([id, progress]) => (
                       <div key={id} className="glass-premium p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 font-black text-xs">
                                {id.substring(0, 2).toUpperCase()}
                             </div>
                             <span className="font-black text-sm uppercase italic text-white/80">{id}</span>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-right">
                                <div className="text-lg font-black text-nexus-blue italic">{progress}%</div>
                                <div className="text-[8px] text-white/20 font-black uppercase tracking-widest">Освоено</div>
                             </div>
                             <ChevronRight size={16} className="text-white/10" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Recommendations */}
              <div className="bg-amber-400/5 p-8 rounded-5xl border border-amber-400/20 space-y-4">
                 <div className="flex items-center gap-3 text-amber-400 font-black text-[10px] uppercase tracking-[0.4em]">
                    <AlertCircle size={16} /> Рекомендация Ордена
                 </div>
                 <p className="text-white/80 font-medium italic">
                    Рекомендуется уделить больше внимания разделу "История", чтобы сбалансировать развитие гуманитарных и технических навыков.
                 </p>
              </div>
            </div>

            <div className="p-10 border-t border-white/5 bg-black/40 text-center">
               <button className="w-full py-6 bg-emerald-500 text-black rounded-4xl font-black text-xl uppercase tracking-[0.3em] shadow-[0_0_30px_#10b981] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Открыть полный отчет
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
