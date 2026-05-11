import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';

export const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { setUsername, completeOnboarding } = useUserStore();
  const [nameInput, setNameInput] = useState('');

  const steps = [
    {
      title: 'Добро пожаловать в Nexus',
      text: 'Место, где знания превращаются в магию, а обучение — в эпическое приключение.',
      image: '🌌'
    },
    {
      title: 'Твой наставник Магистр',
      text: 'Искусственный интеллект, который поможет тебе освоить любую дисциплину и ответит на любые вопросы.',
      image: '🧙‍♂️'
    },
    {
      title: 'Выбери свой путь',
      text: 'Развивайся, повышай уровень, получай достижения и открывай новые миры знаний.',
      image: '⚔️'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else if (step === steps.length - 1) {
      setStep(step + 1); // Move to name input
    }
  };

  const handleFinish = () => {
    if (nameInput.trim()) {
      setUsername(nameInput);
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-nexus-dark flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step < steps.length ? (
          <motion.div
            key="onboarding-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <span className="text-8xl mb-8 animate-float">{steps[step].image}</span>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-nexus-blue to-nexus-purple bg-clip-text text-transparent">
              {steps[step].title}
            </h1>
            <p className="text-white/70 mb-12 text-lg leading-relaxed">
              {steps[step].text}
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold text-xl hover:bg-nexus-blue transition-colors shadow-nexus-neon"
            >
              Продолжить
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="name-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <h2 className="text-3xl font-bold mb-8">Как нам тебя называть?</h2>
            <input
              autoFocus
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Введи свое имя..."
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-xl focus:outline-none focus:border-nexus-purple transition-colors mb-8 text-center"
            />
            <button
              onClick={handleFinish}
              disabled={!nameInput.trim()}
              className="w-full bg-nexus-purple text-white py-4 rounded-2xl font-bold text-xl disabled:opacity-50 transition-all hover:shadow-[0_0_20px_rgba(112,0,255,0.4)]"
            >
              Начать приключение
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
