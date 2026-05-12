import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CentralHub } from './components/CentralHub';
import { TopBar } from './components/TopBar';
import { SubjectPortals } from './components/SubjectPortals';
import { Onboarding } from './components/Onboarding';
import { MagisterTutor } from './components/MagisterTutor';
import { ProfileDashboard } from './components/ProfileDashboard';
import { LearningSession } from './components/LearningSession';
import { useUserStore } from './store/useUserStore';
import { CASE_FILES_CONTENT } from './data/educationalContent';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, ChevronRight, Brain } from 'lucide-react';

function App() {
  const { onboarded, username } = useUserStore();
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [tutorContext, setTutorContext] = useState<string | undefined>(undefined);

  const handleOpenTutor = (context?: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  const selectedSubjectContent = selectedSubjectId ? CASE_FILES_CONTENT[selectedSubjectId] : null;

  return (
    <div className="relative w-full h-screen bg-[#020205] overflow-hidden font-sans text-white">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          {/* Cinematic 3D Environment */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205] z-10 pointer-events-none opacity-80" />
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              <CentralHub />
            </Canvas>
          </div>

          {/* Main Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between pointer-events-none py-12 px-6 overflow-y-auto hide-scrollbar">

            {/* Header Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-16 flex flex-col items-center pointer-events-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-nexus-blue to-transparent" />
                <div className="w-2.5 h-2.5 rounded-full bg-nexus-blue animate-pulse shadow-[0_0_15px_#00f2ff]" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-nexus-blue to-transparent" />
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic text-center leading-[0.8] mb-4">
                Орден <br/>
                <span className="text-nexus-blue neon-text-blue block mt-4">Знаний</span>
              </h1>
              <div className="flex flex-col items-center gap-2">
                 <span className="text-white/30 text-[10px] tracking-[0.8em] uppercase font-black">Archive Access Level: Clear</span>
                 <p className="text-nexus-blue/60 text-[10px] font-black uppercase tracking-widest bg-nexus-blue/5 px-4 py-1 rounded-full border border-nexus-blue/10">Добро пожаловать, Искатель {username}</p>
              </div>
            </motion.div>

            {/* Content Explorer */}
            <div className="w-full max-w-6xl pointer-events-auto mt-20 mb-20">
              <div className="flex items-end justify-between mb-8 px-6">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-nexus-blue to-nexus-purple rounded-full shadow-nexus-neon" />
                    <div>
                       <h3 className="font-black uppercase tracking-[0.2em] text-lg italic">Доступные Архивы</h3>
                       <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">Выберите сферу для исследования</p>
                    </div>
                 </div>
                 <div className="hidden md:flex items-center gap-3 text-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest">Листайте вправо</span>
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center">
                       <ChevronRight size={16} />
                    </div>
                 </div>
              </div>
              <SubjectPortals onSelect={setSelectedSubjectId} />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-2xl pointer-events-auto relative pb-8 px-4">
              <div className="absolute -inset-20 bg-nexus-blue/5 blur-[100px] rounded-full pointer-events-none" />

              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenTutor()}
                className="flex-[2] glass-premium py-7 rounded-[3rem] flex items-center justify-center gap-5 font-black text-nexus-blue shadow-[0_0_40px_rgba(0,242,255,0.15)] border border-nexus-blue/30 uppercase tracking-[0.3em] text-base relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-nexus-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-2xl bg-nexus-blue/20 flex items-center justify-center border border-nexus-blue/30 group-hover:rotate-12 transition-transform">
                   <Sparkles size={24} className="group-hover:animate-spin-slow" />
                </div>
                Спросить Магистра
              </motion.button>

              <div className="flex gap-4">
                 <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(true)}
                  className="w-24 h-24 glass-premium rounded-[3rem] flex items-center justify-center text-white/70 border border-white/10 shadow-premium group relative"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                  <User size={36} className="group-hover:text-nexus-blue transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 glass-premium rounded-[3rem] flex items-center justify-center text-white/70 border border-white/10 shadow-premium group relative"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                  <Brain size={36} className="group-hover:text-nexus-purple transition-colors" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Modals & Layers */}
          <AnimatePresence>
            {selectedSubjectContent && (
              <LearningSession
                subject={selectedSubjectContent}
                onClose={() => setSelectedSubjectId(null)}
                onOpenTutor={handleOpenTutor}
              />
            )}
          </AnimatePresence>

          <MagisterTutor
            isOpen={isTutorOpen}
            onClose={() => setIsTutorOpen(false)}
            initialContext={tutorContext}
          />

          <ProfileDashboard
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
