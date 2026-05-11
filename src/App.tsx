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
import { EDUCATIONAL_CONTENT } from './data/educationalContent';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, GraduationCap } from 'lucide-react';

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

  const selectedSubjectContent = selectedSubjectId ? EDUCATIONAL_CONTENT[selectedSubjectId] : null;

  return (
    <div className="relative w-full h-screen bg-nexus-gradient overflow-hidden font-sans text-white">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          {/* 3D Background */}
          <div className="absolute inset-0 z-0 bg-nexus-glow">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <CentralHub />
            </Canvas>
          </div>

          {/* UI Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-6 pb-12">
            <div /> {/* Spacer */}

            <div className="flex flex-col items-center space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-nexus-blue" />
                  <GraduationCap className="text-nexus-blue" size={20} />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-nexus-blue" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
                  Орден <span className="text-nexus-blue neon-text-blue">Знаний</span>
                </h1>
                <p className="text-white/30 text-xs md:text-sm tracking-[0.5em] uppercase font-bold">Путь к великой истине</p>
              </motion.div>

              <div className="w-full max-w-5xl pointer-events-auto">
                <SubjectPortals onSelect={setSelectedSubjectId} />
              </div>

              <div className="flex gap-4 justify-center w-full max-w-md pointer-events-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenTutor()}
                  className="flex-1 glass-premium py-5 rounded-[2rem] flex items-center justify-center gap-3 font-black text-nexus-blue shadow-nexus-neon border border-nexus-blue/30 uppercase tracking-widest text-sm"
                >
                  <Sparkles size={20} />
                  Магистр
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(true)}
                  className="w-20 h-20 glass-premium rounded-[2rem] flex items-center justify-center text-white/70 border border-white/10"
                >
                  <User size={32} />
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
