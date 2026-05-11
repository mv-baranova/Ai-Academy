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

  // New Character System properties
  gender: 'male' | 'female' | 'other' | '';
  appearance: string;
  rank: string;
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

      // Defaults for Character System
      gender: '',
      appearance: 'standard',
      rank: 'Послушник',
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

        // Auto-rank up logic
        let newRank = state.rank;
        if (newLevel >= 5) newRank = 'Странник';
        if (newLevel >= 10) newRank = 'Мастер';
        if (newLevel >= 20) newRank = 'Мудрец';

        return {
          xp: finalXP,
          level: newLevel,
          rank: newRank
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
    }),
    {
      name: 'nexus-user-storage',
    }
  )
);
