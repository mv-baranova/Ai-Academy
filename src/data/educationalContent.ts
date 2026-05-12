import { mathContent } from './knowledge/math';
import { russianContent } from './knowledge/russian';
import { historyContent } from './knowledge/history';
import { englishContent } from './knowledge/english';
import { literatureContent } from './knowledge/literature';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Investigation {
  id: string;
  title: string;
  hook: string;
  confusion: string;
  association: string;
  visualScheme: string;
  explanation: string;
  lifeExample: string;
  miniTask: QuizQuestion;
  verdict: string;
  memoryAnchor: string;
  xp: number;
}

export interface CaseTopic {
  id: string;
  title: string;
  investigations: Investigation[];
}

export interface CaseFileContent {
  id: string;
  name: string;
  topics: CaseTopic[];
}

export const CASE_FILES_CONTENT: Record<string, CaseFileContent> = {
  math: mathContent,
  russian: russianContent,
  history: historyContent,
  english: englishContent,
  literature: literatureContent,
};
