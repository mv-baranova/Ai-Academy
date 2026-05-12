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
            initial={{ x: '100%', opacity: 0, rotateY: -10 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: '100%', opacity: 0, rotateY: 10 }}
            transition={{ type: 'spring', damping: 35, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-[150] w-full md:w-[800px] bg-[#020205] flex flex-col border-l border-white/10 shadow-2xl overflow-hidden font-sans spatial-layer"
          >
            <div className="noise-texture" />

            {/* Immersive Header */}
            <div className="p-14 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-blue via-nexus-purple to-nexus-blue opacity-50 shadow-nexus-neon" />
              <div className="absolute inset-0 bg-nexus-blue/5 animate-pulse-slow pointer-events-none" />

              <div className="flex items-center gap-10 relative z-10">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-6xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-hologram group-hover:scale-105 transition-all duration-700">
                    <BrainCircuit className="text-nexus-blue w-14 h-14" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full border-[6px] border-[#020205] animate-pulse shadow-[0_0_20px_#22c55e]" />
                </div>
                <div>
                  <h2 className="font-black text-5xl uppercase italic tracking-[-0.05em] leading-none mb-3">Магистр <span className="text-nexus-blue neon-text-blue">Знаний</span></h2>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] text-white/30 uppercase tracking-[0.6em] font-black animate-hologram-flicker">Neural Core Prime v7.1</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative z-10">
                <button onClick={clearHistory} className="p-5 hover:bg-rose-500/10 text-white/20 hover:text-rose-500 rounded-4xl transition-all border border-transparent hover:border-rose-500/20" title="Flush Matrices">
                  <Trash2 size={32} />
                </button>
                <button onClick={onClose} className="p-5 hover:bg-white/5 rounded-4xl transition-all border border-white/5">
                  <X size={48} />
                </button>
              </div>
            </div>

            {/* Matrix Toggle */}
            <div className="px-14 py-6 border-b border-white/5 flex gap-6 overflow-x-auto hide-scrollbar bg-black/60 relative z-10">
              {(['mock', 'openai', 'gemini', 'claude'] as AIProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`px-10 py-4 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] border transition-all flex items-center gap-4 whitespace-nowrap shadow-xl ${
                    provider === p
                    ? 'bg-nexus-blue/20 border-nexus-blue text-nexus-blue shadow-hologram'
                    : 'bg-white/5 border-white/10 text-white/30 hover:border-white/20'
                  }`}
                >
                  <Cpu size={18} /> {p} SYSTEM
                </button>
              ))}
            </div>

            {/* Neural Stream Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-14 space-y-20 custom-scrollbar bg-gradient-to-b from-transparent to-nexus-blue/5 relative z-10">
              {messages.map((msg, i) => {
                const { intro, cards } = msg.role === 'assistant' ? parseContent(msg.content) : { intro: msg.content, cards: [] };

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-10 max-w-[98%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-20 h-20 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center border shadow-2xl transition-all hover:scale-110 ${
                        msg.role === 'user'
                          ? 'bg-nexus-purple/20 border-nexus-purple/40 text-nexus-purple shadow-premium-glow'
                          : 'bg-nexus-blue/20 border-nexus-blue/40 text-nexus-blue shadow-hologram'
                      }`}>
                        {msg.role === 'user' ? <User size={40} /> : <Bot size={40} />}
                      </div>
                      <div className={`flex flex-col gap-10 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex-1`}>
                        {intro && (
                          <div className={`p-12 rounded-[4rem] text-2xl leading-relaxed shadow-spatial relative overflow-hidden ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-nexus-purple to-nexus-purple/80 text-white rounded-tr-none'
                              : 'glass-premium text-white/95 border border-white/10 rounded-tl-none'
                          }`}>
                            <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" />
                            <div className="font-medium whitespace-pre-wrap relative z-10">{intro}</div>
                          </div>
                        )}

                        {cards.length > 0 && (
                          <div className="grid grid-cols-1 gap-10 w-full">
                            {cards.map((card, cIdx) => {
                              const config = getCardConfig(card.title);
                              const Icon = config.icon;
                              return (
                                <motion.div
                                  key={cIdx}
                                  initial={{ opacity: 0, x: -40 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: cIdx * 0.2 }}
                                  className="glass-premium border border-white/5 rounded-[5rem] p-12 relative overflow-hidden group/card shadow-spatial"
                                >
                                  <div className={`absolute top-0 right-0 p-12 opacity-5 group-hover/card:opacity-20 transition-all duration-1000 group-hover/card:scale-125 ${config.color}`}>
                                    <Icon size={180} />
                                  </div>
                                  <div className="flex items-center gap-6 mb-10">
                                     <div className={`p-5 rounded-[2rem] ${config.bg} ${config.color} border ${config.border} shadow-hologram`}>
                                        <Icon size={32} />
                                     </div>
                                     <h4 className="font-black text-base uppercase tracking-[0.6em] text-white/30">{card.title}</h4>
                                  </div>
                                  <div className="text-3xl text-white/90 font-medium leading-relaxed italic prose prose-invert max-w-none relative z-10">
                                    {card.body}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}

                        <div className={`text-[12px] font-mono font-black uppercase tracking-[0.5em] opacity-30 px-8 ${
                          msg.role === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • SYNC_OK
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-premium px-16 py-10 rounded-[3.5rem] flex gap-8 border border-nexus-blue/30 shadow-hologram relative">
                    <div className="absolute inset-0 bg-nexus-blue/5 animate-pulse" />
                    <div className="w-5 h-5 bg-nexus-blue rounded-full animate-bounce shadow-hologram" style={{ animationDelay: '0ms' }} />
                    <div className="w-5 h-5 bg-nexus-blue rounded-full animate-bounce shadow-hologram" style={{ animationDelay: '200ms' }} />
                    <div className="w-5 h-5 bg-nexus-blue rounded-full animate-bounce shadow-hologram" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Command Input Area */}
            <div className="p-14 bg-[#010103] border-t border-white/10 relative z-20">
              <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-[#010103] to-transparent pointer-events-none" />

              <div className="relative group/input">
                <div className="absolute -inset-1 bg-nexus-blue/10 blur-3xl opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-[5rem]" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Дешифровать запрос..."
                  className="w-full bg-white/5 border border-white/10 rounded-[4rem] pl-14 pr-40 py-12 focus:outline-none focus:border-nexus-blue/40 transition-all placeholder:text-white/10 text-4xl font-medium relative z-10 shadow-spatial"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-6 top-6 bottom-6 px-16 bg-nexus-blue text-black rounded-[3rem] font-black hover:shadow-hologram transition-all disabled:opacity-20 flex items-center justify-center z-20"
                >
                  <Send size={48} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between mt-12 px-10">
                 <div className="flex items-center gap-6 text-[14px] text-white/20 font-black uppercase tracking-[0.6em]">
                    <div className="flex gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-nexus-blue shadow-hologram" />
                       <span className="w-2.5 h-2.5 rounded-full bg-nexus-blue animate-hologram-flicker shadow-hologram" />
                       <span className="w-2.5 h-2.5 rounded-full bg-nexus-blue shadow-hologram" />
                    </div>
                    Cognitive Stream Decryption Active
                 </div>
                 <div className="flex items-center gap-5 text-[14px] text-white/20 font-black uppercase tracking-[0.6em] animate-pulse">
                    <MessageSquare size={24} />
                    {initialContext ? initialContext : 'Global Archive Access'}
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
