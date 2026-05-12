import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EducationStage = 'Начальная школа' | 'Средняя школа' | 'Старшие классы' | 'Студент' | 'Взрослый / самообразование';

export interface UserState {
  username: string;
  age: string;
  educationStage: EducationStage | '';
  goals: string[];
  weakSubjects: string[];
  learningStyle: string;
  knowledgeLevel: string;
  level: number;
  xp: number;
  tokens: number;
  onboarded: boolean;
  achievements: string[];
  subjectsProgression: Record<string, number>;
  completedLessons: string[];
  streak: number;
  lastActive: string;
  mysteryTokens: number;
  unlockedMysteries: string[];

  // New Character System properties
  gender: 'male' | 'female' | 'other' | '';
  appearance: string;
  rank: string;
  role: string;
  titles: string[];
  artifacts: string[];
  isPremium: boolean;

  setProfile: (profile: Partial<UserState>) => void;
  setUsername: (name: string) => void;
  addXP: (amount: number) => void;
  completeOnboarding: () => void;
  updateSubjectProgress: (subjectId: string, progress: number) => void;
  addAchievement: (id: string) => void;
  addCompletedLesson: (lessonId: string) => void;
  addArtifact: (id: string) => void;
  addTitle: (title: string) => void;
  addTokens: (amount: number) => void;
  updateStreak: () => void;
  unlockMystery: (mysteryId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      age: '',
      educationStage: '',
      goals: [],
      weakSubjects: [],
      learningStyle: '',
      knowledgeLevel: '',
      level: 1,
      xp: 0,
      tokens: 100,
      onboarded: false,
      achievements: [],
      subjectsProgression: {},
      completedLessons: [],
      streak: 1,
      lastActive: new Date().toISOString(),
      mysteryTokens: 0,
      unlockedMysteries: [],

      // Defaults for Character System
      gender: '',
      appearance: 'standard',
      rank: 'Новичок',
      role: 'Следователь смыслов',
      titles: ['Искатель Истины'],
      artifacts: [],
      isPremium: false,

      setProfile: (profile) => set((state) => ({ ...state, ...profile })),
      setUsername: (name) => set({ username: name }),

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const xpForNextLevel = state.level * 1000;

        let newLevel = state.level;
        let finalXP = newXP;

        if (finalXP >= xpForNextLevel) {
          finalXP -= xpForNextLevel;
          newLevel += 1;
        }

        // Auto-rank up logic (Order of Knowledge Ranks)
        let newRank = state.rank;
        if (newLevel >= 2) newRank = 'Стажёр Ордена';
        if (newLevel >= 5) newRank = 'Искатель';
        if (newLevel >= 10) newRank = 'Аналитик';
        if (newLevel >= 20) newRank = 'Магистр';
        if (newLevel >= 50) newRank = 'Архонт знаний';

        // Reward mystery tokens on level up
        const mysteryBonus = newLevel > state.level ? 1 : 0;

        return {
          xp: finalXP,
          level: newLevel,
          rank: newRank,
          mysteryTokens: state.mysteryTokens + mysteryBonus
        };
      }),

      completeOnboarding: () => set({ onboarded: true }),

      updateSubjectProgress: (subjectId, progress) => set((state) => ({
        subjectsProgression: {
          ...state.subjectsProgression,
          [subjectId]: progress
        }
      })),

      addAchievement: (id) => set((state) => ({
        achievements: state.achievements.includes(id)
          ? state.achievements
          : [...state.achievements, id]
      })),

      addCompletedLesson: (lessonId) => set((state) => ({
        completedLessons: state.completedLessons.includes(lessonId)
          ? state.completedLessons
          : [...state.completedLessons, lessonId]
      })),

      addArtifact: (id) => set((state) => ({
        artifacts: state.artifacts.includes(id) ? state.artifacts : [...state.artifacts, id]
      })),

      addTitle: (title) => set((state) => ({
        titles: state.titles.includes(title) ? state.titles : [...state.titles, title]
      })),

      addTokens: (amount) => set((state) => ({
        tokens: state.tokens + amount
      })),

      unlockMystery: (mysteryId) => set((state) => ({
          unlockedMysteries: [...state.unlockedMysteries, mysteryId],
          mysteryTokens: Math.max(0, state.mysteryTokens - 1)
      })),

      updateStreak: () => set((state) => {
        const last = new Date(state.lastActive);
        const now = new Date();
        const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

        if (diff > 1 && diff < 2) {
            // Reward for streak
            const bonusXP = (state.streak + 1) * 50;
            return {
                streak: state.streak + 1,
                lastActive: now.toISOString(),
                xp: state.xp + bonusXP
            };
        } else if (diff >= 2) {
          return { streak: 1, lastActive: now.toISOString() };
        }
        return { lastActive: now.toISOString() };
      }),
    }),
    {
      name: 'nexus-user-storage',
    }
  )
);
