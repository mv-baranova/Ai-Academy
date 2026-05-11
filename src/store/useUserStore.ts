import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string;
  level: number;
  xp: number;
  tokens: number;
  onboarded: boolean;
  achievements: string[];
  subjectsProgression: Record<string, number>;

  setUsername: (name: string) => void;
  addXP: (amount: number) => void;
  completeOnboarding: () => void;
  updateSubjectProgress: (subjectId: string, progress: number) => void;
  addAchievement: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      level: 1,
      xp: 0,
      tokens: 100,
      onboarded: false,
      achievements: [],
      subjectsProgression: {},

      setUsername: (name) => set({ username: name }),

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const xpForNextLevel = state.level * 1000;
        if (newXP >= xpForNextLevel) {
          return {
            xp: newXP - xpForNextLevel,
            level: state.level + 1
          };
        }
        return { xp: newXP };
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
    }),
    {
      name: 'nexus-user-storage',
    }
  )
);
