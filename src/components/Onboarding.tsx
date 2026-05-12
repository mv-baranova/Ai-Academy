import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore, EducationStage } from '../store/useUserStore';
import { ChevronRight, Sparkles, Brain, Target, Shield, BookOpen, Star, Rocket } from 'lucide-react';

export const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    educationStage: '' as EducationStage,
    goals: [] as string[],
    learningStyle: '',
    role: 'Следователь смыслов'
  });

  const { setProfile, completeOnboarding } = useUserStore();

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      setProfile({ ...formData, onboarded: true });
      completeOnboarding();
    }
  };

  const roles = [
    { id: 'Следователь смыслов', icon: Shield, desc: 'Ищет скрытые связи и логику' },
    { id: 'Архивариус', icon: BookOpen, desc: 'Собирает и структурирует знания' },
    { id: 'Лингвист-разведчик', icon: Brain, desc: 'Взламывает коды языков' },
    { id: 'Мастер логики', icon: Target, desc: 'Решает сложнейшие задачи' },
    { id: 'Хранитель знаний', icon: Star, desc: 'Оберегает мудрость Ордена' }
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#020205] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-nexus-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-xl glass-premium p-10 md:p-16 rounded-6xl border border-white/10 shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
             <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
              className="h-full bg-nexus-blue shadow-nexus-neon"
             />
          </div>

          {step === 0 && (
            <div className="space-y-10 text-center">
              <div className="w-24 h-24 rounded-4xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon mx-auto mb-4">
                <Sparkles size={48} className="text-nexus-blue" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Добро пожаловать <br/><span className="text-nexus-blue">в Орден</span></h2>
              <p className="text-white/40 text-sm font-black uppercase tracking-[0.4em]">Мы ждали тебя, Искатель</p>
              <button
                onClick={handleNext}
                className="w-full py-8 bg-nexus-blue text-black rounded-4xl font-black text-2xl uppercase tracking-[0.3em] shadow-nexus-neon hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Начать путь
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic tracking-tight">Как тебя называть?</h3>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Твой позывной..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-2xl focus:outline-none focus:border-nexus-blue/50 transition-all text-white placeholder:text-white/10"
              />
              <button
                disabled={!formData.username}
                onClick={handleNext}
                className="w-full py-8 bg-white text-black rounded-4xl font-black text-2xl uppercase tracking-[0.3em] disabled:opacity-20 transition-all"
              >
                Далее
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic tracking-tight">Твоя стадия обучения?</h3>
              <div className="grid gap-3">
                {['Начальная школа', 'Средняя школа', 'Старшие классы', 'Студент', 'Взрослый / самообразование'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      setFormData({ ...formData, educationStage: stage as any });
                      handleNext();
                    }}
                    className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-left font-black text-lg hover:bg-nexus-blue/10 hover:border-nexus-blue/30 transition-all flex items-center justify-between group"
                  >
                    {stage}
                    <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic tracking-tight">Выбери свою роль</h3>
              <div className="grid gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setFormData({ ...formData, role: role.id });
                      handleNext();
                    }}
                    className={`w-full p-6 rounded-3xl border transition-all text-left flex items-center gap-6 group ${
                      formData.role === role.id ? 'bg-nexus-blue/10 border-nexus-blue' : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                       formData.role === role.id ? 'bg-nexus-blue/20 border-nexus-blue/40 text-nexus-blue' : 'bg-white/5 border-white/10 text-white/30'
                    }`}>
                       <role.icon size={28} />
                    </div>
                    <div>
                       <div className={`font-black text-lg uppercase italic ${formData.role === role.id ? 'text-nexus-blue' : 'text-white'}`}>{role.id}</div>
                       <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">{role.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic tracking-tight">Как тебе легче понимать?</h3>
              <div className="grid gap-4">
                {[
                  { id: 'stories', label: 'Через истории и кейсы', icon: Rocket },
                  { id: 'schemes', label: 'Через схемы и структуру', icon: Shield },
                  { id: 'examples', label: 'Через живые примеры', icon: Target },
                  { id: 'tasks', label: 'Через задачи и практику', icon: Brain }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setFormData({ ...formData, learningStyle: style.id });
                      handleNext();
                    }}
                    className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-left font-black text-lg hover:border-nexus-blue/40 transition-all flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-nexus-blue transition-colors">
                       <style.icon size={24} />
                    </div>
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 text-center">
               <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-nexus-blue rounded-full blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-32 h-32 rounded-5xl bg-nexus-blue/10 border border-nexus-blue/30 flex items-center justify-center shadow-nexus-neon">
                     <Shield size={64} className="text-nexus-blue" />
                  </div>
               </div>
               <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase italic tracking-tight">Профиль создан</h3>
                  <p className="text-white/40 text-sm font-black uppercase tracking-[0.3em]">Искатель {formData.username}, Орден приветствует тебя!</p>
               </div>
               <button
                onClick={handleNext}
                className="w-full py-8 bg-nexus-blue text-black rounded-4xl font-black text-2xl uppercase tracking-[0.3em] shadow-nexus-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                Войти в Орден <Rocket size={28} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
