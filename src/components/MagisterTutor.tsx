import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, BrainCircuit, History, Trash2, Cpu, MessageSquare, ChevronRight, Zap, Target, Lightbulb, Image as ImageIcon, Search, Anchor, ArrowRight, GitMerge, Layers, Repeat } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { aiTutorService, Message, AIProvider } from '../services/aiTutorService';

interface MagisterTutorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

const parseContent = (content: string) => {
  const parts = content.split('---CARD:');
  const intro = parts[0];
  const cards = parts.slice(1).map(part => {
    const [title, ...body] = part.split('---');
    return { title, body: body.join('---').trim() };
  });
  return { intro, cards };
};

const getCardConfig = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('суть')) return { icon: History, color: 'text-nexus-blue', bg: 'bg-nexus-blue/10', border: 'border-nexus-blue/30' };
  if (t.includes('ассоциация')) return { icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' };
  if (t.includes('код') || t.includes('схема')) return { icon: ImageIcon, color: 'text-nexus-purple', bg: 'bg-nexus-purple/10', border: 'border-nexus-purple/30' };
  if (t.includes('цепь')) return { icon: GitMerge, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' };
  if (t.includes('модель')) return { icon: Layers, color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/30' };
  if (t.includes('сравнение')) return { icon: Repeat, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30' };
  if (t.includes('пример') || t.includes('в жизни')) return { icon: Target, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' };
  if (t.includes('проверь')) return { icon: Search, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30' };
  if (t.includes('якорь')) return { icon: Anchor, color: 'text-nexus-gold', bg: 'bg-nexus-gold/10', border: 'border-nexus-gold/30' };
  if (t.includes('шаг')) return { icon: ArrowRight, color: 'text-nexus-blue', bg: 'bg-nexus-blue/10', border: 'border-nexus-blue/30' };
  return { icon: Zap, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' };
};

export const MagisterTutor = ({ isOpen, onClose, initialContext }: MagisterTutorProps) => {
  const { username, age, educationStage, learningStyle } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('mock');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 0) {
        return [
          {
            role: 'assistant',
            content: `Приветствую, Искатель ${username}! Я Магистр Знаний.

${initialContext ? `Вижу, ты изучаешь **"${initialContext}"**. Давай активируем твои когнитивные матрицы и разложим это дело на атомы.` : 'Все архивы Ордена открыты перед тобой. Что именно кажется тебе запутанным?'}`,
            timestamp: Date.now()
          }
        ];
      }
      return prev;
    });
  }, [username, initialContext]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiTutorService.getResponse(
        userMessage,
        { username, age: age || '14', educationStage: educationStage as any, learningStyle },
        initialContext,
        provider
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: Date.now()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Произошел сбой в когнитивном эфире. Попробуйте восстановить связь позже.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    aiTutorService.clearSession(username);
    setMessages([{
      role: 'assistant',
      content: "Когнитивные матрицы очищены. Мы начинаем с чистого листа, Искатель.",
      timestamp: Date.now()
    }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[150] w-full md:w-[750px] bg-[#020205] flex flex-col border-l border-white/10 shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-12 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-blue via-nexus-purple to-nexus-blue opacity-50 shadow-nexus-neon" />

              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-5xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon group-hover:scale-105 transition-all duration-700">
                    <BrainCircuit className="text-nexus-blue w-12 h-12" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-[#020205] animate-pulse shadow-[0_0_15px_#22c55e]" />
                </div>
                <div>
                  <h2 className="font-black text-4xl uppercase italic tracking-tighter leading-none">Магистр <span className="text-nexus-blue neon-text-blue">Знаний</span></h2>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Cognitive Engine v6.2 Active</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={clearHistory} className="p-4 hover:bg-rose-500/10 text-white/20 hover:text-rose-500 rounded-3xl transition-all" title="Очистить матрицы">
                  <Trash2 size={28} />
                </button>
                <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-3xl transition-colors">
                  <X size={40} />
                </button>
              </div>
            </div>

            {/* AI Provider Toggle */}
            <div className="px-12 py-5 border-b border-white/5 flex gap-5 overflow-x-auto hide-scrollbar bg-black/60">
              {(['mock', 'openai', 'gemini', 'claude'] as AIProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 whitespace-nowrap ${
                    provider === p
                    ? 'bg-nexus-blue/20 border-nexus-blue text-nexus-blue shadow-nexus-neon'
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                  }`}
                >
                  <Cpu size={16} /> {p.toUpperCase()} ENGINE
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-16 custom-scrollbar bg-gradient-to-b from-transparent to-nexus-blue/5">
              {messages.map((msg, i) => {
                const { intro, cards } = msg.role === 'assistant' ? parseContent(msg.content) : { intro: msg.content, cards: [] };

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-8 max-w-[95%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-16 h-16 rounded-3xl flex-shrink-0 flex items-center justify-center border shadow-2xl transition-all hover:scale-110 ${
                        msg.role === 'user'
                          ? 'bg-nexus-purple/20 border-nexus-purple/30 text-nexus-purple shadow-nexus-neon-purple'
                          : 'bg-nexus-blue/20 border-nexus-blue/30 text-nexus-blue shadow-nexus-neon'
                      }`}>
                        {msg.role === 'user' ? <User size={32} /> : <Bot size={32} />}
                      </div>
                      <div className={`flex flex-col gap-8 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex-1`}>
                        {intro && (
                          <div className={`p-10 rounded-5xl text-xl leading-relaxed shadow-premium ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-nexus-purple to-nexus-purple/80 text-white rounded-tr-none'
                              : 'glass-premium text-white/90 border border-white/10 rounded-tl-none'
                          }`}>
                            <div className="font-medium whitespace-pre-wrap">{intro}</div>
                          </div>
                        )}

                        {cards.length > 0 && (
                          <div className="grid grid-cols-1 gap-8 w-full">
                            {cards.map((card, cIdx) => {
                              const config = getCardConfig(card.title);
                              const Icon = config.icon;
                              return (
                                <motion.div
                                  key={cIdx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: cIdx * 0.15 }}
                                  className="glass-premium border border-white/5 rounded-6xl p-10 relative overflow-hidden group shadow-premium"
                                >
                                  <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity ${config.color}`}>
                                    <Icon size={140} />
                                  </div>
                                  <div className="flex items-center gap-5 mb-8">
                                     <div className={`p-4 rounded-3xl ${config.bg} ${config.color} border ${config.border}`}>
                                        <Icon size={24} />
                                     </div>
                                     <h4 className="font-black text-sm uppercase tracking-[0.5em] text-white/40">{card.title}</h4>
                                  </div>
                                  <div className="text-2xl text-white/90 font-medium leading-relaxed italic prose prose-invert max-w-none">
                                    {card.body}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}

                        <div className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-30 px-6 ${
                          msg.role === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-premium px-12 py-8 rounded-5xl flex gap-6 border border-nexus-blue/30 shadow-nexus-neon">
                    <div className="w-4 h-4 bg-nexus-blue rounded-full animate-bounce shadow-nexus-neon" style={{ animationDelay: '0ms' }} />
                    <div className="w-4 h-4 bg-nexus-blue rounded-full animate-bounce shadow-nexus-neon" style={{ animationDelay: '150ms' }} />
                    <div className="w-4 h-4 bg-nexus-blue rounded-full animate-bounce shadow-nexus-neon" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-12 bg-[#0a0a0a] border-t border-white/10 relative">
              <div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

              <div className="relative group">
                <div className="absolute inset-0 bg-nexus-blue/5 blur-3xl group-focus-within:bg-nexus-blue/10 transition-colors rounded-6xl" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Задай свой вопрос Магистру..."
                  className="w-full bg-white/5 border border-white/10 rounded-5xl pl-12 pr-32 py-10 focus:outline-none focus:border-nexus-blue/50 transition-all placeholder:text-white/10 text-3xl relative z-10 shadow-premium"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-6 top-6 bottom-6 px-12 bg-nexus-blue text-black rounded-4xl font-black hover:shadow-nexus-neon transition-all disabled:opacity-20 flex items-center justify-center z-20 group"
                >
                  <Send size={40} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-10 px-8">
                 <div className="flex items-center gap-5 text-[12px] text-white/20 font-black uppercase tracking-[0.4em]">
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-nexus-blue shadow-nexus-neon" />
                       <span className="w-2 h-2 rounded-full bg-nexus-blue animate-pulse shadow-nexus-neon" />
                       <span className="w-2 h-2 rounded-full bg-nexus-blue shadow-nexus-neon" />
                    </div>
                    Cognitive Synthesis Online
                 </div>
                 <div className="flex items-center gap-4 text-[12px] text-white/20 font-black uppercase tracking-[0.4em]">
                    <MessageSquare size={20} />
                    {initialContext ? initialContext : 'Global Intelligence'}
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
