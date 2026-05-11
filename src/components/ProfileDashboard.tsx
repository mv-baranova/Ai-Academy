import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';
import {
  X, User, Award, BookOpen, TrendingUp,
  Flame, Star, Calendar, Target, Settings,
  LogOut, Shield, Zap, Users, LineChart
} from 'lucide-react';
import { CASE_FILES } from '../constants';
import { Leaderboard } from './Leaderboard';
import { ParentAnalytics } from './ParentAnalytics';

interface ProfileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDashboard = ({ isOpen, onClose }: ProfileDashboardProps) => {
  const {
    username, level, xp, tokens, achievements,
    subjectsProgression, completedLessons,
    educationStage, age, goals, rank, titles, artifacts
  } = useUserStore();

  const [activeTab, setActiveTab] = React.useState<'profile' | 'social' | 'analytics'>('profile');

  const totalLessons = completedLessons.length;
  const progressToNext = (xp / (level * 1000)) * 100;

  const stats = [
    { label: 'Уроки', value: totalLessons, icon: BookOpen, color: 'text-nexus-blue' },
    { label: 'Опыт', value: xp, icon: Zap, color: 'text-nexus-gold' },
    { label: 'Награды', value: achievements.length, icon: Award, color: 'text-nexus-purple' },
    { label: 'Ударный режим', value: '1 день', icon: Flame, color: 'text-orange-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl overflow-y-auto"
        >
          <div className="max-w-2xl mx-auto p-6 pt-20 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Архив <span className="text-nexus-blue">Искателя</span></h2>
              <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10">
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-10 bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10">
               {[
                 { id: 'profile', icon: User, label: 'Личность' },
                 { id: 'social', icon: Users, label: 'Совет' },
                 { id: 'analytics', icon: LineChart, label: 'Анализ' }
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                     activeTab === tab.id
                     ? 'bg-nexus-blue text-black font-black shadow-nexus-neon'
                     : 'text-white/40 hover:text-white/70'
                   }`}
                 >
                   <tab.icon size={18} />
                   <span className="text-xs uppercase tracking-widest hidden md:block">{tab.label}</span>
                 </button>
               ))}
            </div>

            <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
            {/* Profile Info */}
            <div className="glass-premium rounded-[3rem] p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-blue/10 blur-[60px] rounded-full -mr-10 -mt-10" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-nexus-purple to-nexus-blue p-1 shadow-nexus-neon-purple">
                    <div className="w-full h-full rounded-[2.3rem] bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-nexus-purple to-nexus-blue">
                        {username?.[0] || 'A'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-nexus-gold rounded-2xl flex items-center justify-center border-4 border-[#0a0a0a]">
                    <Shield size={20} className="text-black" />
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-bold mb-1">{username}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 bg-nexus-blue/10 rounded-full text-[10px] font-black text-nexus-blue border border-nexus-blue/20 uppercase tracking-widest">{rank}</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-white/40 border border-white/10 uppercase tracking-widest">{educationStage}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                      <span>Уровень {level}</span>
                      <span>{xp} / {level * 1000} XP</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        className="h-full bg-gradient-to-r from-nexus-purple to-nexus-blue rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="glass-premium p-4 rounded-3xl border border-white/5 text-center">
                  <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Case Files Progress */}
            <div className="glass-premium rounded-[2.5rem] p-8 mb-8">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target size={20} className="text-nexus-blue" /> Твои Расследования
              </h4>
              <div className="grid gap-6">
                {CASE_FILES.map(subj => {
                  const progress = subjectsProgression[subj.id] || 0;
                  return (
                    <div key={subj.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{subj.name}</span>
                        <span className="text-xs text-white/40 font-bold">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: subj.color,
                            boxShadow: `0 0 10px ${subj.color}44`
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Goals & Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-premium rounded-[2.5rem] p-8">
                <h4 className="text-lg font-bold mb-6">Артефакты</h4>
                <div className="flex flex-wrap gap-3">
                  {artifacts.map((art, i) => (
                    <div key={i} className="w-14 h-14 rounded-2xl bg-nexus-blue/5 flex items-center justify-center border border-nexus-blue/20 text-2xl shadow-nexus-neon">
                      🔮
                    </div>
                  ))}
                  {artifacts.length === 0 && <p className="text-white/20 text-sm italic">Артефакты еще не обнаружены</p>}
                </div>
              </div>

              <div className="glass-premium rounded-[2.5rem] p-8">
                <h4 className="text-lg font-bold mb-6">Достижения</h4>
                <div className="flex flex-wrap gap-3">
                  {achievements.map((ach, i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-xl">
                      🏆
                    </div>
                  ))}
                  {achievements.length === 0 && (
                    <div className="text-white/20 text-sm italic">Выполняй расследования</div>
                  )}
                </div>
              </div>
            </div>
            </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div
                key="social-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Leaderboard />
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics-tab"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <ParentAnalytics />
              </motion.div>
            )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
