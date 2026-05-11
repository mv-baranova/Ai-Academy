import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore, EducationStage } from '../store/useUserStore';
import { Sparkles, ChevronRight, GraduationCap, Target, Brain, Activity } from 'lucide-react';

export const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { setProfile, completeOnboarding } = useUserStore();

  const [formData, setFormData] = useState({
    username: '',
    age: '',
    educationStage: '' as EducationStage,
    goals: [] as string[],
    weakSubjects: [] as string[],
    learningStyle: '',
    knowledgeLevel: 'Средний'
  });

  const educationStages: EducationStage[] = [
    'Начальная школа',
    'Средняя школа',
    'Старшие классы',
    'Студент',
    'Взрослый / самообразование'
  ];

  const learningStyles = [
    { id: 'visual', label: 'Визуальный', desc: 'Картинки и схемы' },
    { id: 'reading', label: 'Текстовый', desc: 'Чтение и конспекты' },
    { id: 'practice', label: 'Практический', desc: 'Задачи и проекты' }
  ];

  const goals = ['Улучшить оценки', 'Подготовиться к экзаменам', 'Для общего развития', 'Освоить новую профессию'];

  const handleNext = () => setStep(s => s + 1);

  const handleFinish = () => {
    setProfile(formData);
    completeOnboarding();
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-nexus-glow pointer-events-none opacity-50" />

      <div className="relative w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
              <div className="w-24 h-24 bg-nexus-purple/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-nexus-neon">
                <Sparkles className="text-nexus-blue w-12 h-12" />
              </div>
              <h1 className="text-4xl font-black mb-4 uppercase italic">Орден <span className="text-nexus-blue">Знаний</span></h1>
              <p className="text-white/60 text-lg mb-12">Твой путь к истине начинается здесь. Настрой свой профиль для максимально эффективного обучения.</p>
              <button onClick={handleNext} className="w-full glass-premium py-5 rounded-2xl font-bold text-xl text-white shadow-nexus-neon flex items-center justify-center gap-2">
                Начать <ChevronRight />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="text-nexus-blue" /> Давай познакомимся
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-widest mb-2 ml-2">Как тебя зовут?</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Твое имя"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl focus:outline-none focus:border-nexus-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-widest mb-2 ml-2">Сколько тебе лет?</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Твой возраст"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl focus:outline-none focus:border-nexus-blue transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.username || !formData.age}
                className="w-full mt-12 glass-premium py-5 rounded-2xl font-bold text-xl disabled:opacity-30"
              >
                Далее
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-3xl font-bold mb-8">Этап обучения</h2>
              <div className="space-y-3">
                {educationStages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setFormData({ ...formData, educationStage: stage })}
                    className={`w-full p-5 rounded-2xl text-left border transition-all ${
                      formData.educationStage === stage
                      ? 'bg-nexus-blue/10 border-nexus-blue text-nexus-blue shadow-nexus-neon'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.educationStage}
                className="w-full mt-12 glass-premium py-5 rounded-2xl font-bold text-xl disabled:opacity-30"
              >
                Далее
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Target className="text-nexus-blue" /> Твои цели
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      const newGoals = formData.goals.includes(goal)
                        ? formData.goals.filter(g => g !== goal)
                        : [...formData.goals, goal];
                      setFormData({ ...formData, goals: newGoals });
                    }}
                    className={`w-full p-5 rounded-2xl text-left border transition-all ${
                      formData.goals.includes(goal)
                      ? 'bg-nexus-purple/10 border-nexus-purple text-nexus-purple'
                      : 'bg-white/5 border-white/10 text-white/70'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-full mt-12 glass-premium py-5 rounded-2xl font-bold text-xl"
              >
                Далее
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Brain className="text-nexus-blue" /> Как тебе удобнее учиться?
              </h2>
              <div className="space-y-4">
                {learningStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, learningStyle: style.label })}
                    className={`w-full p-6 rounded-2xl text-left border transition-all ${
                      formData.learningStyle === style.label
                      ? 'bg-nexus-blue/10 border-nexus-blue'
                      : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="font-bold text-xl mb-1">{style.label}</div>
                    <div className="text-sm text-white/50">{style.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleFinish}
                disabled={!formData.learningStyle}
                className="w-full mt-12 bg-white text-black py-5 rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Войти в Орден
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
