import { EducationStage } from '../store/useUserStore';

export type AIProvider = 'openai' | 'gemini' | 'claude' | 'mock';

export interface TutorProfile {
  username: string;
  age: string;
  educationStage: EducationStage;
  learningStyle: string;
  rank?: string;
  isPremium?: boolean;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface TutorSession {
  messages: Message[];
  context?: string;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

// Interface for specific AI providers
interface ProviderImplementation {
  generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>>;
}

class MockProvider implements ProviderImplementation {
  async generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>> {
    const lowerInput = prompt.toLowerCase();
    const isChild = profile.educationStage === 'Начальная школа' || parseInt(profile.age) < 12;

    let content = "";
    if (lowerInput.includes('привет') || lowerInput.includes('здравствуй')) {
      content = isChild
        ? `Приветствую, юный Искатель ${profile.username}! 🌟 Твои глаза полны любопытства. Какую тайну мы раскроем сегодня в архивах?`
        : `Приветствую вас в чертогах Ордена, ${profile.username}. Звезды знаний указывают на ваш путь. Какое расследование требует моего вмешательства?`;
    } else if (lowerInput.includes('сложно') || lowerInput.includes('не понимаю')) {
      content = `Трудности — это лишь запертые двери, ${profile.username}. У нас есть ключи. Давайте разберем этот фрагмент на более простые символы. С чего начнем?`;
    } else {
      const fallbacks = [
        `Интригующий вопрос. В анналах Ордена говорится, что истина часто скрыта за слоями прошлых открытий.`,
        `Ваш разум остер, как клинок Искателя. Давайте углубимся в суть этого явления.`,
        `Чтобы дешифровать это, нам нужно взглянуть на основы. Что вы уже знаете об этом?`
      ];
      content = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    return { content };
  }
}

class RealAIProvider implements ProviderImplementation {
  constructor(private name: AIProvider) {}
  async generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>> {
    // Simulated API call
    return {
      content: `[Симуляция ${this.name}] Магистр анализирует ваш запрос через призму ${this.name}. Искатель ${profile.username}, ваше стремление к истине похвально.`,
      usage: { promptTokens: 10, completionTokens: 20 }
    };
  }
}

class TutorService {
  private sessions: Record<string, TutorSession> = {};
  private providers: Record<AIProvider, ProviderImplementation> = {
    mock: new MockProvider(),
    openai: new RealAIProvider('openai'),
    gemini: new RealAIProvider('gemini'),
    claude: new RealAIProvider('claude'),
  };

  private getSession(username: string): TutorSession {
    if (!this.sessions[username]) {
      this.sessions[username] = { messages: [] };
    }
    return this.sessions[username];
  }

  async getResponse(
    input: string,
    profile: TutorProfile,
    context?: string,
    providerType: AIProvider = 'mock'
  ): Promise<AIResponse> {
    const session = this.getSession(profile.username);

    // Add user message to session
    session.messages.push({ role: 'user', content: input, timestamp: Date.now() });

    const provider = this.providers[providerType];
    const systemPrompt = this.generateSystemPrompt(profile, context);

    // In a real implementation, we would send the systemPrompt + session.messages
    const result = await provider.generateResponse(input, session.messages, profile);

    const response: AIResponse = {
      content: result.content || "Магистр временно недоступен. Попробуйте позже.",
      provider: providerType,
      usage: result.usage
    };

    session.messages.push({ role: 'assistant', content: response.content, timestamp: Date.now() });
    return response;
  }

  private generateSystemPrompt(profile: TutorProfile, context?: string): string {
    return `Ты — Магистр Знаний... (Системный промпт для ${profile.username})`;
  }

  clearSession(username: string) {
    delete this.sessions[username];
  }
}

export const aiTutorService = new TutorService();

// Legacy export for backward compatibility during transition
export const generateTutorResponse = (
  input: string,
  userProfile: any,
  context?: string
): string => {
  return "Магистр обрабатывает ваш запрос... (Перейдите на использование aiTutorService.getResponse)";
};
