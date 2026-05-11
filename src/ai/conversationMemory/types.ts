export interface MemoryRecord {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SessionMemory {
  sessionId: string;
  history: MemoryRecord[];
}
