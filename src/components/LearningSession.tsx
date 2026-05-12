import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseFileContent, Investigation } from '../data/educationalContent';
import { X, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight, BookOpen, Lightbulb, Image as ImageIcon, MessageSquare, Zap, Target, Star } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface LearningSessionProps {
  subject: CaseFileContent;
  onClose: () => void;
  onOpenTutor: (context: string) => void;
}

type StepType = 'intrigue' | 'association' | 'visualScheme' | 'explanation' | 'lifeExample' | 'miniTask' | 'magisterAnswer';

const STEPS: StepType[] = ['intrigue', 'association', 'visualScheme', 'explanation', 'lifeExample', 'miniTask', 'magisterAnswer'];

const STEP_METADATA: Record<StepType, { title: string; icon: any; color: string }> = {
  intrigue: { title: 'Интрига', icon: Zap, color: 'text-amber-400' },
  association: { title: 'Ассоциация', icon: Lightbulb, color: 'text-nexus-blue' },
  visualScheme: { title: 'Схема', icon: ImageIcon, color: 'text-nexus-purple' },
  explanation: { title: 'Объяснение', icon: BookOpen, color: 'text-emerald-400' },
  lifeExample: { title: 'Пример', icon: Target, color: 'text-rose-400' },
  miniTask: { title: 'Испытание', icon: Star, color: 'text-indigo-400' },
  magisterAnswer: { title: 'Вердикт', icon: MessageSquare, color: 'text-nexus-blue' }
};

export const LearningSession = ({ subject, onClose, onOpenTutor }: LearningSessionProps) => {
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const { addXP, addCompletedLesson } = useUserStore();

  const handleStart = (investigation: Investigation) => {
    setActiveInvestigation(investigation);
    setCurrentStepIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !activeInvestigation) return;

    const correct = selectedOption === activeInvestigation.miniTask.correctAnswer;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (!activeInvestigation) return;

    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      // Completion
      addXP(activeInvestigation.xp);
      addCompletedLesson(activeInvestigation.id);
      setActiveInvestigation(null);
      setCurrentStepIdx(0);
    }
  };

  const currentStep = STEPS[currentStepIdx];
  const metadata = STEP_METADATA[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-[#050505] flex flex-col font-sans"
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between glass-premium">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-2xl transition-colors">
            <X size={24} />
          </button>
          <div>
            <h2 className="font-black text-xl tracking-tight uppercase italic">{subject.name}</h2>
            {activeInvestigation && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                   {STEPS.map((_, idx) => (
                     <div
                      key={idx}
                      className={`h-1 w-4 rounded-full transition-all duration-500 ${idx <= currentStepIdx ? 'bg-nexus-blue' : 'bg-white/10'}`}
                     />
                   ))}
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{currentStepIdx + 1}/{STEPS.length}</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => onOpenTutor(activeInvestigation ? `Тема: ${activeInvestigation.title}` : `Предмет: ${subject.name}`)}
          className="flex items-center gap-2 bg-nexus-blue/10 text-nexus-blue px-5 py-2.5 rounded-2xl text-xs font-black border border-nexus-blue/20 hover:bg-nexus-blue/20 transition-all shadow-nexus-neon"
        >
          <Sparkles size={16} /> Спросить Магистра
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {!activeInvestigation ? (
          <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-12">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block p-4 rounded-3xl bg-nexus-blue/5 border border-nexus-blue/20 mb-4"
              >
                <BookOpen size={48} className="text-nexus-blue" />
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Архив <br/><span className="text-nexus-blue">{subject.name}</span></h3>
              <p className="text-white/40 text-xs font-black uppercase tracking-[0.4em]">Выберите дело для начала расследования</p>
            </div>

            <div className="grid gap-6">
              {subject.topics.map((topic, tIdx) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: tIdx * 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="flex items-center gap-3 text-xs font-black text-white/30 uppercase tracking-[0.3em] px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-nexus-blue shadow-nexus-neon" />
                    {topic.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topic.investigations.map(inv => (
                      <button
                        key={inv.id}
                        onClick={() => handleStart(inv)}
                        className="glass-premium p-8 rounded-[2.5rem] text-left group hover:border-nexus-blue/50 transition-all relative overflow-hidden flex flex-col justify-between min-h-[180px]"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                          <Zap size={64} className="text-nexus-blue" />
                        </div>
                        <div>
                           <div className="font-black text-xl group-hover:text-nexus-blue transition-colors uppercase leading-tight mb-2 italic">{inv.title}</div>
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-white/40 uppercase bg-white/5 px-2 py-1 rounded-lg">+{inv.xp} XP</span>
                              <span className="text-[10px] font-black text-nexus-blue uppercase tracking-widest">Active File</span>
                           </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-white/20 group-hover:text-nexus-blue font-black text-[10px] uppercase tracking-widest transition-all">
                           Начать <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto h-full flex flex-col p-6 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="flex-1 flex flex-col"
              >
                {/* Step Indicator Badge */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${metadata.color}`}>
                    <metadata.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Этап {currentStepIdx + 1}</span>
                    <h4 className="font-black text-lg uppercase italic leading-none">{metadata.title}</h4>
                  </div>
                </div>

                <div className="flex-1">
                  {currentStep === 'intrigue' && (
                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-tight">{activeInvestigation.title}</h3>
                      <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed italic border-l-4 border-nexus-blue pl-6 py-2">
                        {activeInvestigation.intrigue}
                      </p>
                    </div>
                  )}

                  {currentStep === 'association' && (
                    <div className="space-y-8">
                      <div className="bg-nexus-blue/10 p-8 rounded-[3rem] border border-nexus-blue/20 relative overflow-hidden shadow-2xl">
                        <Lightbulb className="absolute -top-4 -right-4 text-nexus-blue opacity-10 w-32 h-32" />
                        <p className="text-2xl md:text-3xl font-bold text-nexus-blue leading-tight mb-6 italic">
                          "Это как..."
                        </p>
                        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                          {activeInvestigation.association}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'visualScheme' && (
                    <div className="space-y-8">
                      <div className="glass-premium p-10 rounded-[3rem] border border-white/10 flex items-center justify-center min-h-[300px] shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-nexus-blue/5 to-nexus-purple/5 opacity-50" />
                        <div className="relative text-center font-mono text-xl md:text-2xl text-nexus-blue tracking-tighter font-black bg-black/40 p-8 rounded-2xl border border-white/5">
                           {activeInvestigation.visualScheme}
                        </div>
                      </div>
                      <p className="text-center text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Визуальная расшифровка кода</p>
                    </div>
                  )}

                  {currentStep === 'explanation' && (
                    <div className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium">
                          {activeInvestigation.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'lifeExample' && (
                    <div className="space-y-8">
                      <div className="bg-emerald-500/5 p-8 rounded-[3rem] border border-emerald-500/20 relative shadow-2xl">
                        <div className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                          <Target size={14} /> В реальном мире
                        </div>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed italic">
                          {activeInvestigation.lifeExample}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'miniTask' && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight">Полевое испытание</h3>
                        <p className="text-lg text-white font-bold leading-tight">
                          {activeInvestigation.miniTask.question}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {activeInvestigation.miniTask.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isCorrect !== true) {
                                setSelectedOption(idx);
                                setIsCorrect(null);
                              }
                            }}
                            className={`w-full p-6 rounded-[2rem] text-left border transition-all font-black text-lg ${
                              selectedOption === idx
                                ? (isCorrect === true ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                                   isCorrect === false ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
                                   'bg-nexus-blue/10 border-nexus-blue text-nexus-blue shadow-nexus-neon')
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-sm ${
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
                            {activeInvestigation.miniTask.hint}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {currentStep === 'magisterAnswer' && (
                    <div className="space-y-8 h-full flex flex-col items-center justify-center text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-24 h-24 rounded-full bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon mb-4"
                      >
                         <Sparkles className="text-nexus-blue" size={40} />
                      </motion.div>
                      <div className="space-y-4 max-w-lg">
                        <h3 className="text-3xl font-black uppercase italic">Слово Магистра</h3>
                        <p className="text-xl text-white/90 leading-relaxed font-medium">
                          {activeInvestigation.magisterAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-12">
                   {currentStep === 'miniTask' ? (
                     isCorrect === null ? (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={selectedOption === null}
                          className="w-full bg-white text-black py-6 rounded-[2.5rem] font-black text-xl disabled:opacity-30 uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Подтвердить выбор
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-6">
                           <div className={`flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                              {isCorrect ? <CheckCircle2 className="animate-bounce" /> : <AlertCircle className="animate-pulse" />}
                              {isCorrect ? 'Доступ разрешен' : 'Код неверен'}
                           </div>
                           {isCorrect && (
                             <button
                               onClick={handleNext}
                               className="w-full bg-nexus-blue text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] shadow-nexus-neon hover:scale-[1.02] active:scale-[0.98] transition-all"
                             >
                               Продолжить
                             </button>
                           )}
                        </div>
                      )
                   ) : (
                     <button
                        onClick={handleNext}
                        className="w-full bg-nexus-blue text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] shadow-nexus-neon flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {currentStepIdx === STEPS.length - 1 ? 'Завершить дело' : 'Далее'}
                        <ArrowRight size={24} />
                      </button>
                   )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
