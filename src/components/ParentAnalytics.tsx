import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Brain, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export const ParentAnalytics = () => {
  const skills = [
    { name: 'Логика и Математика', level: 85, trend: 'up' },
    { name: 'Критическое мышление', level: 92, trend: 'up' },
    { name: 'Цифровая грамотность', level: 78, trend: 'flat' },
    { name: 'Гуманитарный анализ', level: 65, trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black uppercase italic tracking-tighter">Отчет <span className="text-nexus-blue">Наставника</span></h3>
        <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Объективный анализ интеллектуального роста</p>
      </div>

      <div className="grid gap-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <span className="text-sm font-bold text-white/70">{skill.name}</span>
              <span className="text-nexus-blue font-black">{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                className="h-full bg-gradient-to-r from-nexus-blue to-nexus-purple"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-premium p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3 text-nexus-gold">
           <Info size={20} />
           <span className="font-black uppercase tracking-widest text-xs text-white">ИИ-Рекомендация</span>
        </div>
        <p className="text-sm text-white/60 leading-relaxed italic">
          "Искатель демонстрирует выдающиеся способности в дедуктивном анализе. Рекомендуется углубить исследования в области 'Исследования аномалий' (Физика) для развития математического аппарата."
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
         <CheckCircle2 className="text-green-500" />
         <div>
            <div className="text-xs font-black uppercase text-green-500">Безопасность подтверждена</div>
            <div className="text-[10px] text-white/30 uppercase">Весь контент соответствует стандартам Ордена</div>
         </div>
      </div>
    </div>
  );
};
