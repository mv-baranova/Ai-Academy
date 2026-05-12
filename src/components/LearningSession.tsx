import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseFileContent, Investigation } from '../data/educationalContent';
import { X, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight, BookOpen, Lightbulb, Image as ImageIcon, MessageSquare, Zap, Target, Star, Anchor, EyeOff, Search, GitMerge, Layers, Repeat, Cpu } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { LogicChain, MentalModel, SentenceDissection } from './VisualCognition';

interface LearningSessionProps {
  subject: CaseFileContent;
  onClose: () => void;
  onOpenTutor: (context: string) => void;
}

type StepType = 'intrigue' | 'confusion' | 'association' | 'visualScheme' | 'explanation' | 'lifeExample' | 'miniTask' | 'magisterAnswer' | 'memoryAnchor';

const STEPS: StepType[] = ['intrigue', 'confusion', 'association', 'visualScheme', 'explanation', 'lifeExample', 'miniTask', 'magisterAnswer', 'memoryAnchor'];

const STEP_METADATA: Record<StepType, { title: string; icon: any; color: string; bgColor: string; border: string }> = {
  intrigue: { title: 'Интрига', icon: Zap, color: 'text-amber-400', bgColor: 'bg-amber-400/10', border: 'border-amber-400/30' },
  confusion: { title: 'Заблуждение', icon: EyeOff, color: 'text-rose-400', bgColor: 'bg-rose-400/10', border: 'border-rose-400/30' },
  association: { title: 'Ассоциация', icon: Lightbulb, color: 'text-nexus-blue', bgColor: 'bg-nexus-blue/10', border: 'border-nexus-blue/30' },
  visualScheme: { title: 'Код', icon: ImageIcon, color: 'text-nexus-purple', bgColor: 'bg-nexus-purple/10', border: 'border-nexus-purple/30' },
  explanation: { title: 'Суть', icon: GitMerge, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  lifeExample: { title: 'В жизни', icon: Target, color: 'text-sky-400', bgColor: 'bg-sky-400/10', border: 'border-sky-400/30' },
  miniTask: { title: 'Испытание', icon: Search, color: 'text-indigo-400', bgColor: 'bg-indigo-400/10', border: 'border-indigo-400/30' },
  magisterAnswer: { title: 'Вердикт', icon: MessageSquare, color: 'text-nexus-blue', bgColor: 'bg-nexus-blue/10', border: 'border-nexus-blue/30' },
  memoryAnchor: { title: 'Якорь', icon: Anchor, color: 'text-nexus-gold', bgColor: 'bg-nexus-gold/10', border: 'border-nexus-gold/30' }
};

const SUBJECT_THEMES: Record<string, { main: string; glow: string; accent: string; label: string }> = {
    math: { main: 'text-rose-400', glow: 'shadow-[0_0_30px_rgba(251,113,133,0.3)]', accent: 'bg-rose-400/10', label: 'Hidden Logic System' },
    russian: { main: 'text-blue-400', glow: 'shadow-[0_0_30px_rgba(96,165,250,0.3)]', accent: 'bg-blue-400/10', label: 'Language Decoding Bureau' },
    history: { main: 'text-amber-400', glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]', accent: 'bg-amber-400/10', label: 'Political Conspiracy Archive' },
    english: { main: 'text-emerald-400', glow: 'shadow-[0_0_30px_rgba(52,211,153,0.3)]', accent: 'bg-emerald-400/10', label: 'Global Communication Agency' },
    literature: { main: 'text-purple-400', glow: 'shadow-[0_0_30px_rgba(192,132,252,0.3)]', accent: 'bg-purple-400/10', label: 'Hidden Psychology Archive' }
};

const parseVisualScheme = (scheme: string) => {
    if (scheme.includes('| chain:')) {
        const parts = scheme.split('| chain:')[1].split('->').map(p => p.trim());
        return <LogicChain steps={parts} />;
    }
    if (scheme.includes('| model:')) {
        const [title, ...sidesRaw] = scheme.split('| model:')[1].split('|');
        const sides = sidesRaw.map(s => {
            const [label, content, color] = s.split(':').map(p => p.trim());
            return { label, content, color: color === 'blue' ? 'text-nexus-blue' : 'text-rose-400' };
        });
        return <MentalModel title={title} sides={sides} />;
    }
    if (scheme.includes('| dissection:')) {
        const parts = scheme.split('| dissection:')[1].split('|').map(p => {
            const [word, role, color] = p.split(':').map(x => x.trim());
            return { word, role, color: color === 'blue' ? 'text-nexus-blue' : color === 'purple' ? 'text-nexus-purple' : 'text-white' };
        });
        return <SentenceDissection parts={parts} />;
    }
    return <div className="text-center font-mono text-3xl md:text-5xl text-nexus-blue tracking-tighter font-black bg-black/60 p-16 rounded-[3rem] border border-white/10 shadow-nexus-neon animate-glow-pulse">{scheme}</div>;
};

export const LearningSession = ({ subject, onClose, onOpenTutor }: LearningSessionProps) => {
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const { addXP, addCompletedLesson } = useUserStore();
  const theme = SUBJECT_THEMES[subject.id] || SUBJECT_THEMES.math;

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
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[120] bg-[#010103] flex flex-col font-sans overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-10 pointer-events-none transition-colors duration-1000 ${theme.accent}`} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <div className="p-8 border-b border-white/5 flex items-center justify-between glass-premium relative z-10">
        <div className="flex items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 hover:bg-white/5 rounded-3xl transition-all"
          >
            <X size={32} />
          </motion.button>
          <div>
            <div className="flex items-center gap-3">
               <h2 className={`font-black text-3xl tracking-tighter uppercase italic leading-none ${theme.main}`}>{subject.name}</h2>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] border border-white/10 px-3 py-1 rounded-lg">{theme.label}</span>
            </div>
            {activeInvestigation && (
              <div className="flex items-center gap-4 mt-3">
                <div className="flex gap-2">
                   {STEPS.map((_, idx) => (
                     <motion.div
                      key={idx}
                      initial={false}
                      animate={{
                        width: idx === currentStepIdx ? 40 : 12,
                        backgroundColor: idx <= currentStepIdx ? (idx === currentStepIdx ? '#00f2ff' : 'rgba(255,255,255,0.4)') : 'rgba(255,255,255,0.1)'
                      }}
                      className={`h-1.5 rounded-full shadow-lg`}
                     />
                   ))}
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">{currentStepIdx + 1} / {STEPS.length} PHASE</span>
              </div>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenTutor(activeInvestigation ? `Тема: ${activeInvestigation.title}` : `Предмет: ${subject.name}`)}
          className="flex items-center gap-4 bg-nexus-blue/10 text-nexus-blue px-8 py-4 rounded-3xl text-xs font-black border border-nexus-blue/20 hover:bg-nexus-blue/20 transition-all shadow-nexus-neon uppercase tracking-[0.2em]"
        >
          <Cpu size={20} className="animate-pulse" /> Спросить Магистра
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10">
        {!activeInvestigation ? (
          <div className="max-w-5xl mx-auto p-12 md:p-20 space-y-20">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className={`inline-block p-10 rounded-[3rem] bg-white/5 border border-white/10 mb-6 shadow-2xl relative group`}
              >
                <div className={`absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${theme.accent}`} />
                <BookOpen size={80} className={`relative z-10 ${theme.main}`} />
              </motion.div>
              <h3 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">Архив <br/><span className={`${theme.main} filter drop-shadow-[0_0_20px_currentColor]`}>{subject.name}</span></h3>
              <p className="text-white/30 text-[12px] font-black uppercase tracking-[0.6em]">Выберите протокол исследования для активации</p>
            </div>

            <div className="grid gap-16">
              {subject.topics.map((topic, tIdx) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tIdx * 0.15 }}
                  className="space-y-8"
                >
                  <h4 className="flex items-center gap-6 text-[12px] font-black text-white/40 uppercase tracking-[0.5em] px-6">
                    <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${theme.main.replace('text', 'bg')}`} />
                    {topic.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {topic.investigations.map(inv => (
                      <motion.button
                        key={inv.id}
                        whileHover={{ scale: 1.02, y: -8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStart(inv)}
                        className="glass-premium p-12 rounded-[4rem] text-left group hover:border-white/20 transition-all relative overflow-hidden flex flex-col justify-between min-h-[280px] shadow-premium border border-white/5"
                      >
                        <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${theme.main}`}>
                          <Search size={120} />
                        </div>
                        <div>
                           <div className="font-black text-3xl group-hover:text-nexus-blue transition-colors uppercase leading-[0.9] mb-6 italic tracking-tighter">{inv.title}</div>
                           <div className="flex items-center gap-5">
                              <span className="text-[11px] font-black text-nexus-blue uppercase bg-nexus-blue/10 px-4 py-2 rounded-2xl border border-nexus-blue/20 shadow-nexus-neon">+{inv.xp} XP</span>
                              <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">Protocol Active</span>
                           </div>
                        </div>
                        <div className="mt-10 flex items-center gap-4 text-white/20 group-hover:text-nexus-blue font-black text-[11px] uppercase tracking-[0.4em] transition-all">
                           Активировать дешифровку <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-full flex flex-col p-10 md:p-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center gap-6 mb-12">
                  <div className={`p-6 rounded-[2rem] border ${metadata.bgColor} ${metadata.color} ${metadata.border} shadow-2xl relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <metadata.icon size={40} className="relative z-10" />
                  </div>
                  <div>
                    <span className="text-[12px] font-black text-white/20 uppercase tracking-[0.5em] font-mono">Sequence Phase {currentStepIdx + 1}</span>
                    <h4 className="font-black text-3xl uppercase italic leading-none tracking-tight">{metadata.title}</h4>
                  </div>
                </div>

                <div className="flex-1">
                  {currentStep === 'intrigue' && (
                    <div className="space-y-12">
                      <h3 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] tracking-tighter">{activeInvestigation.title}</h3>
                      <div className="relative">
                         <div className="absolute -left-10 top-0 bottom-0 w-2 bg-nexus-blue shadow-nexus-neon rounded-full" />
                         <p className="text-3xl md:text-4xl text-white/90 font-medium leading-relaxed italic pl-10">
                           {activeInvestigation.hook}
                         </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'confusion' && (
                    <div className="space-y-10">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-rose-500/5 p-12 rounded-[4rem] border border-rose-500/20 relative shadow-2xl overflow-hidden group"
                      >
                         <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <EyeOff className="absolute -top-10 -right-10 text-rose-500 opacity-5 w-64 h-64 group-hover:rotate-12 transition-transform duration-1000" />
                         <h5 className="text-rose-400 font-black uppercase text-[12px] tracking-[0.5em] mb-8 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            Когнитивная ловушка
                         </h5>
                         <p className="text-3xl md:text-4xl text-white font-bold leading-tight italic tracking-tight">
                           {activeInvestigation.confusion}
                         </p>
                      </motion.div>
                    </div>
                  )}

                  {currentStep === 'association' && (
                    <div className="space-y-10">
                      <div className="bg-nexus-blue/5 p-12 rounded-[4rem] border border-nexus-blue/20 relative overflow-hidden shadow-2xl group">
                        <Lightbulb className="absolute -top-10 -right-10 text-nexus-blue opacity-5 w-64 h-64 group-hover:scale-110 transition-transform duration-1000" />
                        <p className="text-4xl md:text-5xl font-black text-nexus-blue leading-[0.85] mb-10 italic uppercase tracking-tighter">
                          "Это как..."
                        </p>
                        <p className="text-3xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                          {activeInvestigation.association}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'visualScheme' && (
                    <div className="space-y-12">
                      <div className="glass-premium p-10 rounded-[4rem] border border-white/5 flex items-center justify-center min-h-[400px] shadow-premium relative overflow-hidden">
                        <div className={`absolute inset-0 opacity-10 ${theme.accent}`} />
                        {parseVisualScheme(activeInvestigation.visualScheme)}
                      </div>
                      <p className="text-center text-white/20 text-[12px] font-black uppercase tracking-[0.5em]">Дешифровка визуального кода • Phase Alpha</p>
                    </div>
                  )}

                  {currentStep === 'explanation' && (
                    <div className="space-y-10">
                       <div className="bg-emerald-500/5 p-12 rounded-[4rem] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-30" />
                          <p className="text-3xl md:text-4xl leading-relaxed text-white/90 font-medium tracking-tight">
                            {activeInvestigation.explanation}
                          </p>
                       </div>
                    </div>
                  )}

                  {currentStep === 'lifeExample' && (
                    <div className="space-y-10">
                      <div className="bg-sky-500/5 p-12 rounded-[4rem] border border-sky-500/20 relative shadow-2xl">
                        <div className="text-[12px] text-sky-400 font-black uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                          <Target size={24} className="animate-bounce" /> Полевая верификация
                        </div>
                        <p className="text-3xl md:text-4xl text-white/90 leading-tight italic font-medium tracking-tight">
                          {activeInvestigation.lifeExample}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'miniTask' && (
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Полевое испытание</h3>
                        <p className="text-3xl text-white font-bold leading-tight tracking-tight">
                          {activeInvestigation.miniTask.question}
                        </p>
                      </div>

                      <div className="grid gap-6">
                        {activeInvestigation.miniTask.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={isCorrect === true ? {} : { x: 10 }}
                            onClick={() => {
                              if (isCorrect !== true) {
                                setSelectedOption(idx);
                                setIsCorrect(null);
                              }
                            }}
                            className={`w-full p-10 rounded-[3.5rem] text-left border transition-all font-black text-2xl shadow-premium relative overflow-hidden ${
                              selectedOption === idx
                                ? (isCorrect === true ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]' :
                                   isCorrect === false ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]' :
                                   'bg-nexus-blue/10 border-nexus-blue text-nexus-blue shadow-nexus-neon')
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-8">
                              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-lg font-black font-mono ${
                                selectedOption === idx ? 'border-current' : 'border-white/20'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </div>
                              {option}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {isCorrect === false && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setShowHint(true)}
                          className="flex items-center gap-4 text-nexus-purple font-black text-[12px] uppercase tracking-[0.5em] mx-auto group"
                        >
                          <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" /> Запросить данные разведки
                        </motion.button>
                      )}

                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="p-10 bg-nexus-purple/10 border border-nexus-purple/30 rounded-[3rem] text-nexus-purple text-2xl italic text-center font-bold shadow-2xl"
                          >
                            {activeInvestigation.miniTask.hint}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {currentStep === 'magisterAnswer' && (
                    <div className="space-y-12 h-full flex flex-col items-center justify-center text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-40 h-40 rounded-[3rem] bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon mb-10"
                      >
                         <Sparkles className="text-nexus-blue" size={72} />
                      </motion.div>
                      <div className="space-y-8 max-w-3xl">
                        <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Вердикт Магистра</h3>
                        <p className="text-3xl md:text-4xl text-white/90 leading-tight font-medium italic tracking-tight">
                          {activeInvestigation.verdict}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 'memoryAnchor' && (
                    <div className="space-y-12 h-full flex flex-col items-center justify-center text-center">
                       <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-nexus-gold/10 p-16 rounded-[5rem] border border-nexus-gold/30 relative shadow-[0_0_80px_rgba(255,184,0,0.2)] max-w-3xl overflow-hidden group"
                       >
                          <Anchor className="absolute -top-16 -left-16 text-nexus-gold opacity-5 w-80 h-80 group-hover:scale-110 transition-transform duration-1000" />
                          <h5 className="text-nexus-gold font-black uppercase text-[12px] tracking-[0.6em] mb-12">Когнитивный якорь</h5>
                          <p className="text-4xl md:text-5xl text-white font-black italic leading-[1.1] tracking-tighter">
                            {activeInvestigation.memoryAnchor}
                          </p>
                       </motion.div>
                       <p className="text-white/20 text-[12px] font-black uppercase tracking-[0.5em] font-mono animate-pulse">Neural Link Established</p>
                    </div>
                  )}
                </div>

                <div className="mt-20">
                   {currentStep === 'miniTask' ? (
                     isCorrect === null ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCheckAnswer}
                          disabled={selectedOption === null}
                          className="w-full bg-white text-black py-10 rounded-[4rem] font-black text-3xl disabled:opacity-30 uppercase tracking-[0.4em] transition-all shadow-2xl"
                        >
                          Подтвердить код
                        </motion.button>
                      ) : (
                        <div className="flex flex-col items-center gap-10">
                           <div className={`flex items-center gap-6 font-black uppercase tracking-[0.4em] text-3xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                              {isCorrect ? <CheckCircle2 size={48} className="animate-bounce" /> : <AlertCircle size={48} className="animate-pulse" />}
                              {isCorrect ? 'Доступ разрешен' : 'Код отклонен'}
                           </div>
                           {isCorrect && (
                             <motion.button
                               whileHover={{ scale: 1.02, y: -5 }}
                               onClick={handleNext}
                               className="w-full bg-nexus-blue text-black py-10 rounded-[4rem] font-black text-3xl uppercase tracking-[0.4em] shadow-nexus-neon transition-all"
                             >
                               Продолжить
                             </motion.button>
                           )}
                        </div>
                      )
                   ) : (
                     <motion.button
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="w-full bg-nexus-blue text-black py-10 rounded-[4rem] font-black text-3xl uppercase tracking-[0.4em] shadow-nexus-neon flex items-center justify-center gap-8 transition-all"
                      >
                        {currentStepIdx === STEPS.length - 1 ? 'Завершить дело' : 'Следующая фаза'}
                        <ArrowRight size={40} />
                      </motion.button>
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
