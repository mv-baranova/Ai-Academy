import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Zap, Sparkles, Check } from 'lucide-react';

interface CharacterCustomizationProps {
  onComplete: (data: { gender: string; appearance: string }) => void;
}

export const CharacterCustomization = ({ onComplete }: CharacterCustomizationProps) => {
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [style, setStyle] = useState('minimalist');

  const styles = [
    { id: 'minimalist', name: 'Минималист', desc: 'Чистая эстетика Ордена' },
    { id: 'cyber', name: 'Кибер-атлет', desc: 'Энергия неоновых кодов' },
    { id: 'classic', name: 'Классик', desc: 'Традиции древних архивов' },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Создай свою <span className="text-nexus-blue">Идентичность</span></h2>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Выбери свой облик в мире знаний</p>
      </div>

      <div className="space-y-8">
        {/* Gender Selection */}
        <div className="grid grid-cols-2 gap-4">
          {(['male', 'female'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                gender === g
                ? 'bg-nexus-blue/10 border-nexus-blue shadow-nexus-neon'
                : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${gender === g ? 'text-nexus-blue' : 'text-white'}`}>
                <User size={32} />
              </div>
              <span className="font-black uppercase tracking-widest text-xs">
                {g === 'male' ? 'Мужской' : 'Женский'}
              </span>
            </button>
          ))}
        </div>

        {/* Style Selection */}
        <div className="space-y-4">
          <label className="block text-[10px] text-white/30 font-black uppercase tracking-[0.3em] ml-2">Визуальный стиль</label>
          <div className="grid gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-5 rounded-3xl border transition-all text-left flex items-center justify-between ${
                  style === s.id
                  ? 'bg-nexus-purple/10 border-nexus-purple shadow-nexus-neon-purple'
                  : 'bg-white/5 border-white/10 opacity-60'
                }`}
              >
                <div>
                  <div className={`font-black uppercase text-sm ${style === s.id ? 'text-nexus-purple' : 'text-white'}`}>{s.name}</div>
                  <div className="text-xs text-white/40">{s.desc}</div>
                </div>
                {style === s.id && <Check className="text-nexus-purple" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ gender, appearance: style })}
        className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
      >
        <Sparkles size={20} /> Завершить инициацию
      </button>
    </div>
  );
};
