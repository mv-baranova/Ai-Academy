import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { generateTutorResponse } from '../services/aiTutorService';

interface MagisterTutorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

export const MagisterTutor = ({ isOpen, onClose, initialContext }: MagisterTutorProps) => {
  const { username, age, educationStage, learningStyle } = useUserStore();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Приветствую, ${username}! Я Магистр Знаний. ${initialContext ? `Вижу, ты изучаешь "${initialContext}".` : ''} Чем я могу тебе помочь?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateTutorResponse(
        userMessage,
        { username, age, educationStage: educationStage as any, learningStyle },
        initialContext
      );
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[150] bg-[#050505] flex flex-col md:left-auto md:w-[450px] border-l border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between glass-premium">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-nexus-blue/20 flex items-center justify-center border border-nexus-blue/30 shadow-nexus-neon">
                <Sparkles className="text-nexus-blue" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Магистр Знаний</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Система активна</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-nexus-purple/20' : 'bg-nexus-blue/20'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-nexus-purple text-white shadow-lg'
                      : 'glass-premium text-white/90 border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-premium px-4 py-3 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-nexus-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-black/40 backdrop-blur-2xl border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спроси о чем угодно..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:border-nexus-blue transition-all placeholder:text-white/20"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 bottom-2 px-4 bg-nexus-blue text-black rounded-xl font-bold hover:shadow-nexus-neon transition-all disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-white/20 text-center mt-3 uppercase tracking-tighter">
              Магистр может ошибаться. Всегда проверяйте важные факты.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
