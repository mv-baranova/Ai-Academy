import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X } from 'lucide-react';

export const MagisterTutor = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Привет, юный исследователь! Я Магистр, твой проводник в мире знаний Nexus. О чем ты хочешь узнать сегодня?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Отличный вопрос! Давай разберем это пошагово. В Nexus мы ценим любознательность. Какой именно аспект этой темы тебе наиболее интересен?'
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] glass flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-nexus-blue/20 flex items-center justify-center">
                <Sparkles className="text-nexus-blue" />
              </div>
              <div>
                <h2 className="font-bold">Магистр</h2>
                <p className="text-[10px] text-nexus-blue uppercase tracking-widest">AI Наставник</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' ? 'bg-nexus-purple text-white' : 'glass text-white/90'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Задай вопрос Магистру..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-nexus-blue transition-colors"
              />
              <button
                onClick={handleSend}
                className="bg-nexus-blue text-black p-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
