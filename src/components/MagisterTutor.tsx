import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, BrainCircuit, History, Trash2, Cpu } from 'lucide-react';
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
            content: `Приветствую, Искатель ${username}! Я Магистр Знаний. ${initialContext ? `Вижу, твоё расследование привело тебя к "${initialContext}".` : 'Все архивы Ордена открыты перед тобой.'} Чем я могу помочь?`,
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
        { username, age, educationStage: educationStage as any, learningStyle },
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
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[150] bg-[#050505]/95 backdrop-blur-2xl flex flex-col md:left-auto md:w-[500px] border-l border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between glass-premium relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-blue via-nexus-purple to-nexus-blue opacity-50" />

            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-14 h-14 rounded-2xl bg-nexus-blue/10 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon group-hover:scale-105 transition-transform">
                  <Sparkles className="text-nexus-blue w-7 h-7" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#050505] animate-pulse" />
              </div>
              <div>
                <h2 className="font-black text-xl uppercase italic tracking-tighter">Магистр <span className="text-nexus-blue">Знаний</span></h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">AI Mentor System v2.0</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={clearHistory} className="p-2 hover:bg-red-500/10 text-white/20 hover:text-red-500 rounded-xl transition-all" title="Очистить историю">
                <Trash2 size={20} />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Provider Selector */}
          <div className="px-6 py-3 border-b border-white/5 flex gap-2 overflow-x-auto hide-scrollbar bg-black/20">
            {(['mock', 'openai', 'gemini', 'claude'] as AIProvider[]).map((p) => (
              <button
                key={p}
                onClick={() => setProvider(p)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 whitespace-nowrap ${
                  provider === p
                  ? 'bg-nexus-blue/20 border-nexus-blue text-nexus-blue shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                  : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Cpu size={12} /> {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${
                    msg.role === 'user'
                      ? 'bg-nexus-purple/20 border-nexus-purple/30 text-nexus-purple shadow-nexus-neon-purple'
                      : 'bg-nexus-blue/20 border-nexus-blue/30 text-nexus-blue shadow-nexus-neon'
                  }`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`relative p-5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-nexus-purple text-white rounded-tr-none shadow-xl'
                      : 'glass-premium text-white/90 border border-white/10 rounded-tl-none'
                  }`}>
                    <div className="font-medium whitespace-pre-wrap">{msg.content}</div>
                    <div className={`text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-30 ${
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
                <div className="glass-premium px-6 py-4 rounded-2xl flex gap-2 border border-nexus-blue/20">
                  <div className="w-2 h-2 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-black/60 backdrop-blur-3xl border-t border-white/10 relative">
             <div className="absolute -top-12 left-0 w-full h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спроси Магистра об истине..."
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-7 pr-16 py-5 focus:outline-none focus:border-nexus-blue transition-all placeholder:text-white/20 text-lg"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-3 bottom-3 px-5 bg-nexus-blue text-black rounded-2xl font-black hover:shadow-nexus-neon transition-all disabled:opacity-30 flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 px-2">
               <div className="flex items-center gap-2 text-[10px] text-white/20 font-black uppercase tracking-widest">
                  <BrainCircuit size={12} /> Adaptive Learning Active
               </div>
               <div className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                  Context: {initialContext ? 'Focused' : 'Global'}
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
