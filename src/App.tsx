import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CentralHub } from './components/CentralHub';
import { TopBar } from './components/TopBar';
import { SubjectPortals } from './components/SubjectPortals';
import { Onboarding } from './components/Onboarding';
import { MagisterTutor } from './components/MagisterTutor';
import { useUserStore } from './store/useUserStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';

function App() {
  const { onboarded, username } = useUserStore();
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="relative w-full h-screen bg-nexus-gradient overflow-hidden font-sans">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <CentralHub />
            </Canvas>
          </div>

          {/* UI Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
            <div className="p-6 space-y-6 pointer-events-auto">
              <div className="flex flex-col items-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-black text-center tracking-tighter uppercase italic"
                >
                  Nexus <span className="text-nexus-blue neon-text">Academy</span>
                </motion.h1>
                <p className="text-white/40 text-sm tracking-[0.3em] uppercase mt-2">Мир безграничных знаний</p>
              </div>

              <SubjectPortals onSelect={(id) => console.log('Selected subject:', id)} />

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTutorOpen(true)}
                  className="flex-1 max-w-[200px] glass py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-nexus-blue shadow-nexus-neon"
                >
                  <Sparkles size={20} />
                  Магистр
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white/70"
                >
                  <User size={28} />
                </motion.button>
              </div>
            </div>
          </div>

          <MagisterTutor isOpen={isTutorOpen} onClose={() => setIsTutorOpen(false)} />

          {/* Profile Modal - Simplified for MVP */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
              >
                <div className="glass w-full max-w-md rounded-3xl p-8 relative">
                  <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 text-white/50">
                    <X />
                  </button>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-nexus-purple mb-4 flex items-center justify-center text-4xl font-bold">
                      {username[0]}
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{username}</h2>
                    <p className="text-nexus-blue uppercase text-xs tracking-widest mb-6">Студент Академии</p>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Достижения</p>
                        <p className="text-xl font-bold">0</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Задания</p>
                        <p className="text-xl font-bold">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

const X = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default App;
