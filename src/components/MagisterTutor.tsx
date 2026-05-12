import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, BrainCircuit, History, Trash2, Cpu, MessageSquare, ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { aiTutorService, Message, AIProvider } from '../services/aiTutorService';

interface MagisterTutorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

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

${initialContext ? `Вижу, ты изучаешь **"${initialContext}"**. Позволь мне пролить свет на неясные моменты этого дела.` : 'Все архивы Ордена открыты перед тобой. Что именно кажется тебе запутанным?'}

Задай свой вопрос, и мы разберем его по частям.`,
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
    const timestamp = Date.now();

    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
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
        content: "Произошел сбой в эфире Ордена. Попробуйте восстановить связь позже.",
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
      content: "Архивы очищены. Мы начинаем с чистого листа, Искатель.",
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
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[150] w-full md:w-[600px] bg-[#050505] flex flex-col border-l border-white/10 shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between glass-premium relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-blue via-nexus-purple to-nexus-blue opacity-50 shadow-[0_0_15px_rgba(0,242,255,0.5)]" />

              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-3xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon group-hover:scale-105 transition-transform duration-500">
                    <Sparkles className="text-nexus-blue w-8 h-8" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#050505] animate-pulse" />
                </div>
                <div>
                  <h2 className="font-black text-2xl uppercase italic tracking-tighter leading-none">Магистр <span className="text-nexus-blue neon-text-blue">Знаний</span></h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Mental Advisor Alpha v3.0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={clearHistory} className="p-3 hover:bg-red-500/10 text-white/20 hover:text-red-500 rounded-2xl transition-all" title="Очистить историю">
                  <Trash2 size={20} />
                </button>
                <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors">
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* AI Provider Toggle */}
            <div className="px-8 py-3 border-b border-white/5 flex gap-3 overflow-x-auto hide-scrollbar bg-black/40">
              {(['mock', 'openai', 'gemini', 'claude'] as AIProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 whitespace-nowrap ${
                    provider === p
                    ? 'bg-nexus-blue/20 border-nexus-blue text-nexus-blue shadow-nexus-neon'
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                  }`}
                >
                  <Cpu size={12} /> {p}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-gradient-to-b from-transparent to-nexus-blue/5">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-5 max-w-[92%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-2xl transition-transform hover:scale-110 ${
                      msg.role === 'user'
                        ? 'bg-nexus-purple/20 border-nexus-purple/30 text-nexus-purple shadow-nexus-neon-purple'
                        : 'bg-nexus-blue/20 border-nexus-blue/30 text-nexus-blue shadow-nexus-neon'
                    }`}>
                      {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                    </div>
                    <div className={`relative p-6 rounded-[2rem] text-base leading-relaxed shadow-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-nexus-purple to-nexus-purple/80 text-white rounded-tr-none'
                        : 'glass-premium text-white/90 border border-white/10 rounded-tl-none'
                    }`}>
                      <div className="font-medium whitespace-pre-wrap prose prose-invert max-w-none prose-p:my-2 prose-strong:text-nexus-blue">
                         {msg.content}
                      </div>
                      <div className={`text-[9px] mt-4 font-black uppercase tracking-widest opacity-30 ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-premium px-8 py-5 rounded-[2rem] flex gap-3 border border-nexus-blue/30 shadow-nexus-neon">
                    <div className="w-2.5 h-2.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-8 bg-[#0a0a0a] border-t border-white/10 relative">
              <div className="absolute -top-16 left-0 w-full h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

              <div className="relative group">
                <div className="absolute inset-0 bg-nexus-blue/5 blur-xl group-focus-within:bg-nexus-blue/10 transition-colors rounded-[2.5rem]" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Опиши то, что тебе не понятно..."
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-8 pr-20 py-6 focus:outline-none focus:border-nexus-blue/50 transition-all placeholder:text-white/10 text-xl relative z-10"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 top-3 bottom-3 px-7 bg-nexus-blue text-black rounded-2xl font-black hover:shadow-nexus-neon transition-all disabled:opacity-20 flex items-center justify-center z-20 group"
                >
                  <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-6 px-4">
                 <div className="flex items-center gap-3 text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
                    <div className="flex gap-1">
                       <span className="w-1 h-1 rounded-full bg-nexus-blue" />
                       <span className="w-1 h-1 rounded-full bg-nexus-blue animate-pulse" />
                       <span className="w-1 h-1 rounded-full bg-nexus-blue" />
                    </div>
                    Deep Learning Core Active
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
                    <MessageSquare size={12} />
                    {initialContext ? initialContext : 'Global Archive'}
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
