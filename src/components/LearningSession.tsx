import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseFileContent, Investigation, QuizQuestion } from '../data/educationalContent';
import { X, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface LearningSessionProps {
  subject: CaseFileContent;
  onClose: () => void;
  onOpenTutor: (context: string) => void;
}

export const LearningSession = ({ subject, onClose, onOpenTutor }: LearningSessionProps) => {
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [quizStep, setQuizStep] = useState<number>(-1); // -1: content, >=0: quiz question
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const { addXP, addCompletedLesson } = useUserStore();

  const handleStart = (investigation: Investigation) => {
    setActiveInvestigation(investigation);
    setQuizStep(-1);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !activeInvestigation) return;

    const correct = selectedOption === activeInvestigation.quiz[quizStep].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (quizStep === activeInvestigation.quiz.length - 1) {
        addXP(activeInvestigation.xp);
        addCompletedLesson(activeInvestigation.id);
      }
    }
  };

  const handleNext = () => {
    if (!activeInvestigation) return;
    if (quizStep < activeInvestigation.quiz.length - 1) {
      setQuizStep(quizStep + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      setActiveInvestigation(null);
      setQuizStep(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-[#050505] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between glass-premium">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
            <X size={24} />
          </button>
          <h2 className="font-bold text-xl">{subject.name}</h2>
        </div>
        <button
          onClick={() => onOpenTutor(activeInvestigation ? `Расследование: ${activeInvestigation.title}` : `Архив: ${subject.name}`)}
          className="flex items-center gap-2 bg-nexus-blue/10 text-nexus-blue px-4 py-2 rounded-xl text-sm font-bold border border-nexus-blue/20"
        >
          <Sparkles size={16} /> Спросить Магистра
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!activeInvestigation ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-2">Архив: {subject.name}</h3>
              <p className="text-white/50 text-sm uppercase tracking-[0.2em]">Выберите дело для начала расследования</p>
            </div>

            {subject.topics.map(topic => (
              <div key={topic.id} className="space-y-4">
                <h4 className="text-xs font-black text-nexus-blue/50 uppercase tracking-[0.3em] mb-2">{topic.title}</h4>
                <div className="grid gap-3">
                  {topic.investigations.map(inv => (
                    <button
                      key={inv.id}
                      onClick={() => handleStart(inv)}
                      className="glass-premium p-6 rounded-3xl flex items-center justify-between group hover:border-nexus-blue/50 transition-all border border-white/5 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-nexus-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-left relative z-10">
                        <div className="font-bold text-lg group-hover:text-nexus-blue transition-colors uppercase tracking-tight">{inv.title}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-white/30 uppercase">{inv.xp} XP</span>
                          {inv.difficultyLevel && (
                             <span className="text-[10px] font-black text-nexus-purple uppercase tracking-widest px-2 py-0.5 bg-nexus-purple/10 rounded-full border border-nexus-purple/20">
                               {inv.difficultyLevel}
                             </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="text-white/20 group-hover:text-nexus-blue group-hover:translate-x-1 transition-all relative z-10" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <AnimatePresence mode="wait">
              {quizStep === -1 ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 pb-24"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-nexus-blue uppercase tracking-[0.3em]">Файл расследования</span>
                    <h3 className="text-4xl font-black uppercase italic">{activeInvestigation.title}</h3>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl leading-relaxed text-white/80 font-medium">{activeInvestigation.content}</p>
                  </div>

                  {activeInvestigation.example && (
                    <div className="bg-nexus-blue/5 border-l-4 border-nexus-blue p-8 rounded-r-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={48} className="text-nexus-blue" />
                      </div>
                      <div className="text-[10px] text-nexus-blue font-black uppercase tracking-[0.2em] mb-3">Улика / Пример</div>
                      <div className="text-white/90 italic text-lg leading-relaxed">{activeInvestigation.example}</div>
                    </div>
                  )}

                  <button
                    onClick={() => setQuizStep(0)}
                    className="w-full bg-nexus-blue text-black py-5 rounded-[2rem] font-black text-lg mt-12 uppercase tracking-widest hover:shadow-nexus-neon transition-all"
                  >
                    Перейти к дешифровке
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`quiz-${quizStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 pb-24"
                >
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Вопрос {quizStep + 1} из {activeInvestigation.quiz.length}</span>
                       <h3 className="text-2xl font-black uppercase">Проверка гипотезы</h3>
                    </div>
                    <div className="text-nexus-blue text-sm font-black tracking-widest">+{activeInvestigation.xp} XP</div>
                  </div>

                  <div className="text-2xl text-white font-bold leading-tight">
                    {activeInvestigation.quiz[quizStep].question}
                  </div>

                  <div className="space-y-3">
                    {activeInvestigation.quiz[quizStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (isCorrect !== true) {
                            setSelectedOption(idx);
                            setIsCorrect(null);
                          }
                        }}
                        className={`w-full p-6 rounded-[1.5rem] text-left border transition-all font-bold ${
                          selectedOption === idx
                            ? (isCorrect === true ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]' :
                               isCorrect === false ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
                               'bg-nexus-blue/10 border-nexus-blue text-nexus-blue shadow-nexus-neon')
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${
                            selectedOption === idx ? 'border-current' : 'border-white/20'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>

                  {isCorrect === false && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-2 text-nexus-purple font-black text-[10px] uppercase tracking-widest mx-auto"
                    >
                      <HelpCircle size={14} /> Получить подсказку из штаба
                    </button>
                  )}

                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-nexus-purple/5 border border-nexus-purple/20 rounded-2xl text-nexus-purple text-sm italic text-center"
                      >
                        {activeInvestigation.quiz[quizStep].hint}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="fixed bottom-0 left-0 w-full p-8 bg-black/80 backdrop-blur-xl border-t border-white/10">
                    <div className="max-w-2xl mx-auto">
                      {isCorrect === null ? (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={selectedOption === null}
                          className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-lg disabled:opacity-30 uppercase tracking-widest transition-all"
                        >
                          Подтвердить выбор
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-6">
                          <div className={`flex items-center gap-3 font-black uppercase tracking-widest text-xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {isCorrect ? <CheckCircle2 className="animate-bounce" /> : <AlertCircle className="animate-pulse" />}
                            {isCorrect ? 'Доступ разрешен' : 'Ошибка доступа'}
                          </div>
                          {isCorrect && (
                            <button
                              onClick={handleNext}
                              className="w-full bg-nexus-blue text-black py-5 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-nexus-neon"
                            >
                              {quizStep < activeInvestigation.quiz.length - 1 ? 'Следующий этап' : 'Завершить расследование'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
