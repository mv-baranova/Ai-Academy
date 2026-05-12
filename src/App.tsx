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
import { Sparkles, User, ChevronRight, Brain, Zap, Target, Award, Trophy, Shield, Activity, Star, Lock, Key } from 'lucide-react';

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
    <div className="relative w-full h-screen bg-[#010103] overflow-hidden font-sans text-white">
      {!onboarded && <Onboarding />}

      {onboarded && (
        <>
          <TopBar />

          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#010103] via-transparent to-[#010103] z-10 pointer-events-none opacity-90" />
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              <CentralHub />
            </Canvas>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between pointer-events-none py-12 px-6 overflow-y-auto hide-scrollbar">

            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 flex flex-col items-center pointer-events-auto"
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic text-center leading-[0.75] mb-6">
                Орден <br/>
                <span className="text-nexus-blue neon-text-blue block mt-6">Знаний</span>
              </h1>

              <div className="flex items-center gap-8 mt-6 glass-premium px-10 py-4 rounded-3xl border border-white/5 shadow-2xl">
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em]">Ранг</span>
                    <span className="text-base font-black text-nexus-blue uppercase italic">{rank}</span>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em]">Level</span>
                    <span className="text-lg font-black text-white italic">{level}</span>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em]">Streak</span>
                    <span className="text-base font-black text-nexus-gold italic flex items-center gap-2"><Star size={16} fill="currentColor"/> {streak}</span>
                 </div>
              </div>
            </motion.div>

            <div className="w-full max-w-6xl pointer-events-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
               <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="glass-premium p-8 rounded-5xl border border-white/5 shadow-premium flex flex-col justify-between group h-full"
               >
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-2xl bg-nexus-gold/10 text-nexus-gold border border-nexus-gold/20">
                        <Trophy size={20} />
                     </div>
                     <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Рейтинг</span>
                  </div>
                  <div className="mt-6 space-y-4">
                     <div className="flex justify-between items-center opacity-40">
                        <span className="text-sm font-black italic">Архивариус_01</span>
                        <span className="text-xs font-black text-nexus-gold">12.4k</span>
                     </div>
                     <div className="flex justify-between items-center text-nexus-blue scale-105">
                        <span className="text-sm font-black italic">{username} (Ты)</span>
                        <span className="text-xs font-black">{xp + (level * 1000)}</span>
                     </div>
                  </div>
               </motion.button>

               <div className="md:col-span-2 glass-premium p-8 rounded-5xl border border-nexus-blue/30 shadow-premium flex items-center justify-between relative overflow-hidden group min-h-[160px]">
                  <div className="absolute inset-0 bg-nexus-blue/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-3 h-3 rounded-full bg-nexus-blue animate-pulse shadow-nexus-neon" />
                        <span className="text-[11px] font-black text-nexus-blue uppercase tracking-[0.4em]">Активное расследование</span>
                     </div>
                     <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Код Пиццы</h4>
                     <p className="text-[11px] text-white/30 uppercase font-black tracking-[0.2em]">Математика • Сектор 01</p>
                  </div>
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={() => setSelectedSubjectId('math')}
                     className="relative z-10 w-16 h-16 rounded-3xl bg-nexus-blue text-black flex items-center justify-center shadow-nexus-neon"
                  >
                     <ChevronRight size={32} />
                  </motion.button>
               </div>

               <div className="glass-premium p-8 rounded-5xl border border-white/5 shadow-premium flex flex-col justify-between group">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-nexus-purple/10 text-nexus-purple border border-nexus-purple/20">
                           <Key size={20} />
                        </div>
                        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Мистерии</span>
                     </div>
                     <div className="text-nexus-purple font-mono font-black text-xl">{mysteryTokens}</div>
                  </div>
                  <div className="mt-6">
                     {mysteryTokens > 0 ? (
                         <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="w-full py-4 bg-nexus-purple/20 border border-nexus-purple/40 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-nexus-purple shadow-nexus-neon-purple hover:bg-nexus-purple/30 transition-all"
                         >
                            Открыть тайну
                         </motion.button>
                     ) : (
                         <div className="flex items-center gap-3 text-white/10">
                            <Lock size={16} />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Нужно больше опыта</span>
                         </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="w-full max-w-6xl pointer-events-auto mt-12 mb-16">
              <div className="flex items-end justify-between mb-10 px-8">
                 <div className="flex items-center gap-6">
                    <div className="w-2 h-12 bg-gradient-to-b from-nexus-blue to-nexus-purple rounded-full shadow-nexus-neon" />
                    <div>
                       <h3 className="font-black uppercase tracking-[0.3em] text-2xl italic">Миры Знаний</h3>
                       <p className="text-[11px] text-white/30 uppercase font-black tracking-[0.4em] mt-1">Выберите архив для погружения</p>
                    </div>
                 </div>
              </div>
              <SubjectPortals onSelect={setSelectedSubjectId} />
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-3xl pointer-events-auto relative pb-8 px-6">
              <div className="absolute -inset-32 bg-nexus-blue/5 blur-[120px] rounded-full pointer-events-none" />

              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenTutor()}
                className="flex-[2] glass-premium py-8 rounded-[3rem] flex items-center justify-center gap-6 font-black text-nexus-blue shadow-premium border border-nexus-blue/20 uppercase tracking-[0.4em] text-base relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-nexus-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-nexus-blue/20 flex items-center justify-center border border-nexus-blue/30 group-hover:rotate-12 transition-transform">
                   <Sparkles size={28} className="group-hover:animate-spin-slow text-nexus-blue" />
                </div>
                Спросить Магистра
              </motion.button>

              <div className="flex gap-6">
                 <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(true)}
                  className="w-24 h-24 glass-premium rounded-[3rem] flex items-center justify-center text-white/70 border border-white/10 shadow-premium group relative"
                >
                  <User size={36} className="group-hover:text-nexus-blue transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="w-24 h-24 glass-premium rounded-[3rem] flex items-center justify-center text-white/70 border border-white/10 shadow-premium group relative"
                >
                  <Trophy size={36} className="group-hover:text-nexus-gold transition-colors" />
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
