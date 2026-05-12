import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CentralHub } from './components/CentralHub';
import { TopBar } from './components/TopBar';
import { SubjectPortals } from './components/SubjectPortals';
import { Onboarding } from './components/Onboarding';
import { MagisterTutor } from './components/MagisterTutor';
import { ProfileDashboard } from './components/ProfileDashboard';
import { Leaderboard } from './components/Leaderboard';
import { ParentAnalytics } from './components/ParentAnalytics';
import { LearningSession } from './components/LearningSession';
import { useUserStore } from './store/useUserStore';
import { CASE_FILES_CONTENT } from './data/educationalContent';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, ChevronRight, Brain, Zap, Target, Award, Trophy, Shield, Activity, Star, Lock, Key, LayoutGrid } from 'lucide-react';

function App() {
  const { onboarded, username, rank, xp, level, streak, mysteryTokens, unlockedMysteries, unlockMystery } = useUserStore();
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [tutorContext, setTutorContext] = useState<string | undefined>(undefined);

  const handleOpenTutor = (context?: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  const selectedSubjectContent = selectedSubjectId ? CASE_FILES_CONTENT[selectedSubjectId] : null;

  return (
    <div className="relative w-full h-screen bg-[#000000] overflow-hidden font-sans text-white spatial-layer">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          {/* Immersive 3D Stage */}
          <div className="absolute inset-0 z-0 scale-110">
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000] z-10 pointer-events-none opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] z-10 pointer-events-none opacity-40" />
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
              <CentralHub activeSubject={selectedSubjectId} />
            </Canvas>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between pointer-events-none pt-24 pb-12 px-6 overflow-y-auto hide-scrollbar">

            {/* Cinematic Header */}
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center pointer-events-auto"
            >
              <div className="relative mb-8">
                 <div className="absolute -inset-10 bg-nexus-blue/10 blur-[60px] rounded-full animate-glow-pulse" />
                 <h1 className="text-8xl md:text-[10rem] font-black tracking-[-0.05em] uppercase italic text-center leading-[0.7] relative z-10 mix-blend-screen opacity-90">
                    Орден <br/>
                    <span className="text-nexus-blue neon-text-blue block mt-8">Знаний</span>
                 </h1>
              </div>

              {/* Spatial HUD */}
              <div className="flex items-center gap-12 glass-premium px-12 py-6 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                 <div className="absolute inset-0 bg-nexus-blue/5 opacity-0 group-hover:opacity-100 transition-opacity animate-hologram-flicker" />
                 <div className="flex flex-col items-center relative z-10">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.5em] mb-2">Protocol</span>
                    <span className="text-lg font-black text-nexus-blue uppercase italic tracking-tighter">{rank}</span>
                 </div>
                 <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                 <div className="flex flex-col items-center relative z-10">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.5em] mb-2">Core LVL</span>
                    <span className="text-2xl font-black text-white italic tracking-tighter">{level}</span>
                 </div>
                 <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                 <div className="flex flex-col items-center relative z-10">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.5em] mb-2">Uptime</span>
                    <span className="text-lg font-black text-nexus-gold italic flex items-center gap-3 tracking-tighter">
                        <Star size={20} fill="currentColor" className="animate-pulse" /> {streak}D
                    </span>
                 </div>
              </div>
            </motion.div>

            {/* Portal Gallery Container */}
            <div className="w-full max-w-[1400px] pointer-events-auto mt-16 mb-20 relative">
              <div className="flex items-center justify-between mb-8 px-10">
                 <div className="flex items-center gap-6">
                    <div className="w-3 h-12 bg-nexus-blue rounded-full shadow-[0_0_20px_#00f2ff] animate-pulse" />
                    <div>
                       <h3 className="font-black uppercase tracking-[0.4em] text-3xl italic leading-none">Системы Познания</h3>
                       <p className="text-[12px] text-white/30 uppercase font-black tracking-[0.6em] mt-2">Активируйте портал для глубокой дешифровки</p>
                    </div>
                 </div>
                 <div className="hidden md:flex gap-3 opacity-30 group hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Scroll to Navigate</span>
                    <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>
              <SubjectPortals onSelect={setSelectedSubjectId} />
            </div>

            {/* Premium Control Bar */}
            <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-4xl pointer-events-auto relative pb-10 px-8">
              <div className="absolute -inset-40 bg-nexus-blue/5 blur-[150px] rounded-full pointer-events-none" />

              <motion.button
                whileHover={{ scale: 1.02, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenTutor()}
                className="flex-[2] glass-premium py-10 rounded-[4rem] flex items-center justify-center gap-8 font-black text-nexus-blue shadow-spatial border border-nexus-blue/20 uppercase tracking-[0.5em] text-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-nexus-blue/10 opacity-0 group-hover:opacity-100 transition-opacity animate-hologram-flicker" />
                <div className="w-14 h-14 rounded-3xl bg-nexus-blue/20 flex items-center justify-center border border-nexus-blue/30 group-hover:rotate-12 transition-transform shadow-hologram">
                   <Sparkles size={32} className="group-hover:animate-spin-slow text-nexus-blue" />
                </div>
                Спросить Магистра
              </motion.button>

              <div className="flex gap-8">
                 <motion.button
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(true)}
                  className="w-28 h-28 glass-premium rounded-[4rem] flex items-center justify-center text-white/70 border border-white/10 shadow-spatial group relative"
                  title="Profile Sync"
                >
                  <User size={42} className="group-hover:text-nexus-blue transition-colors relative z-10" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="w-28 h-28 glass-premium rounded-[4rem] flex items-center justify-center text-white/70 border border-white/10 shadow-spatial group relative"
                  title="Global Matrix"
                >
                  <Trophy size={42} className="group-hover:text-nexus-gold transition-colors relative z-10" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]" />
                </motion.button>
              </div>
            </div>
          </div>

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

          <Leaderboard
            isOpen={isLeaderboardOpen}
            onClose={() => setIsLeaderboardOpen(false)}
          />

          <ParentAnalytics
            isOpen={isParentOpen}
            onClose={() => setIsParentOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
