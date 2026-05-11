import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EducationStage = 'Начальная школа' | 'Средняя школа' | 'Старшие классы' | 'Студент' | 'Взрослый / самообразование';

interface UserState {
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

  setProfile: (profile: Partial<UserState>) => void;
  setUsername: (name: string) => void;
  addXP: (amount: number) => void;
  completeOnboarding: () => void;
  updateSubjectProgress: (subjectId: string, progress: number) => void;
  addAchievement: (id: string) => void;
  addCompletedLesson: (lessonId: string) => void;
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

      setProfile: (profile) => set((state) => ({ ...state, ...profile })),
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

      addCompletedLesson: (lessonId) => set((state) => ({
        completedLessons: state.completedLessons.includes(lessonId)
          ? state.completedLessons
          : [...state.completedLessons, lessonId]
      })),
    }),
    {
      name: 'nexus-user-storage',
    }
  )
);
