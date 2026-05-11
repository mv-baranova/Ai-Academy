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
import { Sparkles, User, GraduationCap, ChevronDown } from 'lucide-react';

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
    <div className="relative w-full h-screen bg-nexus-deep overflow-hidden font-sans text-white">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          {/* Cinematic 3D Environment */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nexus-deep z-10 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              <CentralHub />
            </Canvas>
          </div>

          {/* Main Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between pointer-events-none py-12 px-6">

            {/* Header Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 flex flex-col items-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-nexus-blue" />
                <div className="w-2 h-2 rounded-full bg-nexus-blue animate-pulse shadow-nexus-neon" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-nexus-blue" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-center leading-none">
                Орден <br/>
                <span className="text-nexus-blue neon-text-blue block mt-2">Знаний</span>
              </h1>
              <div className="flex items-center gap-3 mt-6">
                 <span className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-black">Archive Access Level: Clear</span>
              </div>
            </motion.div>

            {/* Content Explorer */}
            <div className="w-full max-w-6xl pointer-events-auto mt-auto mb-12">
              <div className="flex items-center justify-between mb-6 px-4">
                 <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-nexus-blue rounded-full" />
                    <div>
                       <h3 className="font-black uppercase tracking-widest text-sm">Доступные Архивы</h3>
                       <p className="text-[10px] text-white/30 uppercase font-bold">Выберите дело для исследования</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest">Листайте вправо</span>
                    <ChevronDown className="rotate-[-90deg]" size={14} />
                 </div>
              </div>
              <SubjectPortals onSelect={setSelectedSubjectId} />
            </div>

            {/* Action Bar */}
            <div className="flex gap-6 justify-center w-full max-w-xl pointer-events-auto relative">
              <div className="absolute -inset-10 bg-nexus-blue/5 blur-3xl rounded-full pointer-events-none" />

              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenTutor()}
                className="flex-1 glass-premium py-6 rounded-[2.5rem] flex items-center justify-center gap-4 font-black text-nexus-blue shadow-nexus-neon border border-nexus-blue/30 uppercase tracking-[0.2em] text-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-nexus-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles size={20} className="group-hover:animate-spin-slow" />
                Магистр ИИ
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(true)}
                className="w-20 h-20 glass-premium rounded-[2.5rem] flex items-center justify-center text-white/70 border border-white/10 shadow-premium group"
              >
                <User size={32} className="group-hover:text-nexus-blue transition-colors" />
              </motion.button>
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
