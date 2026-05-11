import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubjectContent, Lesson, QuizQuestion } from '../data/educationalContent';
import { X, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface LearningSessionProps {
  subject: SubjectContent;
  onClose: () => void;
  onOpenTutor: (context: string) => void;
}

export const LearningSession = ({ subject, onClose, onOpenTutor }: LearningSessionProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quizStep, setQuizStep] = useState<number>(-1); // -1: lesson content, >=0: quiz question
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const { addXP, addCompletedLesson } = useUserStore();

  const handleLessonStart = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setQuizStep(-1);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !activeLesson) return;

    const correct = selectedOption === activeLesson.quiz[quizStep].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (quizStep === activeLesson.quiz.length - 1) {
        addXP(activeLesson.xp);
        addCompletedLesson(activeLesson.id);
      }
    }
  };

  const handleNext = () => {
    if (!activeLesson) return;
    if (quizStep < activeLesson.quiz.length - 1) {
      setQuizStep(quizStep + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      setActiveLesson(null);
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
          onClick={() => onOpenTutor(activeLesson ? `Тема: ${activeLesson.title}` : `Предмет: ${subject.name}`)}
          className="flex items-center gap-2 bg-nexus-blue/10 text-nexus-blue px-4 py-2 rounded-xl text-sm font-bold border border-nexus-blue/20"
        >
          <Sparkles size={16} /> Спросить Магистра
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!activeLesson ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-2">Мир {subject.name}</h3>
              <p className="text-white/50">Выбери тему, чтобы начать обучение</p>
            </div>

            {subject.topics.map(topic => (
              <div key={topic.id} className="space-y-4">
                <h4 className="text-lg font-bold text-white/40 uppercase tracking-widest">{topic.title}</h4>
                <div className="grid gap-3">
                  {topic.lessons.map(lesson => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonStart(lesson)}
                      className="glass-premium p-6 rounded-2xl flex items-center justify-between group hover:border-nexus-blue/50 transition-all"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg group-hover:text-nexus-blue transition-colors">{lesson.title}</div>
                        <div className="text-sm text-white/40">{lesson.xp} XP</div>
                      </div>
                      <ArrowRight className="text-white/20 group-hover:text-nexus-blue group-hover:translate-x-1 transition-all" />
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
                  <h3 className="text-3xl font-bold">{activeLesson.title}</h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-white/80">{activeLesson.content}</p>
                  </div>
                  {activeLesson.example && (
                    <div className="bg-white/5 border-l-4 border-nexus-blue p-6 rounded-r-2xl">
                      <div className="text-sm text-nexus-blue font-bold uppercase mb-2">Пример</div>
                      <div className="text-white/90 italic">{activeLesson.example}</div>
                    </div>
                  )}
                  <button
                    onClick={() => setQuizStep(0)}
                    className="w-full bg-nexus-blue text-black py-4 rounded-2xl font-bold text-lg mt-12"
                  >
                    Перейти к проверке знаний
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
                    <h3 className="text-2xl font-bold">Вопрос {quizStep + 1} из {activeLesson.quiz.length}</h3>
                    <div className="text-nexus-blue text-sm font-bold">+{activeLesson.xp} XP</div>
                  </div>

                  <div className="text-xl text-white/90 leading-relaxed">
                    {activeLesson.quiz[quizStep].question}
                  </div>

                  <div className="space-y-3">
                    {activeLesson.quiz[quizStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (isCorrect !== true) {
                            setSelectedOption(idx);
                            setIsCorrect(null);
                          }
                        }}
                        className={`w-full p-5 rounded-2xl text-left border transition-all ${
                          selectedOption === idx
                            ? (isCorrect === true ? 'bg-green-500/10 border-green-500 text-green-500' :
                               isCorrect === false ? 'bg-red-500/10 border-red-500 text-red-500' :
                               'bg-nexus-blue/10 border-nexus-blue text-nexus-blue')
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {isCorrect === false && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-2 text-nexus-purple font-bold text-sm"
                    >
                      <HelpCircle size={16} /> Показать подсказку
                    </button>
                  )}

                  {showHint && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-nexus-purple/10 border border-nexus-purple/20 rounded-xl text-nexus-purple text-sm italic">
                      {activeLesson.quiz[quizStep].hint}
                    </motion.div>
                  )}

                  <div className="fixed bottom-0 left-0 w-full p-6 bg-black/80 backdrop-blur-md border-t border-white/10">
                    <div className="max-w-2xl mx-auto">
                      {isCorrect === null ? (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={selectedOption === null}
                          className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg disabled:opacity-30"
                        >
                          Проверить ответ
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <div className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {isCorrect ? <CheckCircle2 /> : <AlertCircle />}
                            {isCorrect ? 'Верно!' : 'Попробуй еще раз'}
                          </div>
                          {isCorrect && (
                            <button
                              onClick={handleNext}
                              className="w-full bg-nexus-blue text-black py-4 rounded-2xl font-bold text-lg"
                            >
                              {quizStep < activeLesson.quiz.length - 1 ? 'Дальше' : 'Завершить урок'}
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
