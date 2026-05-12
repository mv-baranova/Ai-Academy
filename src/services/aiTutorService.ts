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

interface ProviderImplementation {
  generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>>;
}

class MockProvider implements ProviderImplementation {
  async generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>> {
    const lowerInput = prompt.toLowerCase();

    let content = "";

    if (lowerInput.includes('дроб') || lowerInput.includes('не понял')) {
      content = `Искатель ${profile.username}, давай распутаем этот узел!

**Простое объяснение:**
Дроби — это способ записать часть от чего-то целого, когда мы не можем взять всё сразу.

**Аналогия:**
Представь, что мы делим магический Кристалл Знаний на 4 части. Если ты возьмешь одну — у тебя будет 1/4.

**Визуальная схема:**
[ Взятые доли ]
---------------
[ Всего долей ]

**Пошаговая логика:**
1. Посмотри на нижнее число — это на сколько кусков мы режем "пирог".
2. Посмотри на верхнее — это сколько кусков у тебя в руках.
3. Чем больше нижнее число, тем меньше размер одного кусочка!

**Пример:**
Если в твоем отряде 2 человека и у вас 1 яблоко, каждый получит 1/2.

**Мини-схема:**
◯ -> ◐ + ◑ (1 = 1/2 + 1/2)

**Вопрос:**
Если я разделю пиццу на 8 частей и дам тебе 3, какая дробь у нас получится?

**Ободрение:**
Твой разум остер, ты быстро схватываешь суть структуры!`;
    } else if (lowerInput.includes('present perfect')) {
      content = `Загадка времени разгадана, Искатель!

**Простое объяснение:**
Это время-мостик. Действие уже в прошлом, но его результат мы видим или чувствуем прямо сейчас.

**Аналогия:**
Это как свежий отпечаток ноги на песке. Человек уже прошел (прошлое), но след виден сейчас (настоящее).

**Визуальная схема:**
[ Прошлое ] ----(Результат)----> [ СЕЙЧАС ]

**Пошаговая логика:**
1. Берем помощника "Have" или "Has".
2. Добавляем глагол в 3-й форме.
3. Готово! Мы соединили два берега времени.

**Пример:**
"I have lost my keys" — я потерял их когда-то, но результат в том, что СЕЙЧАС я не могу войти домой.

**Мини-схема:**
HAVE/HAS + V3 = Связь времен

**Вопрос:**
Как ты скажешь "Я уже сделал это", используя связь с настоящим?

**Ободрение:**
Ты мастерски дешифруешь коды английского языка! Продолжай в том же духе.`;
    } else {
      content = `Приветствую, Искатель ${profile.username}! Твой запрос принят в архивах Ордена.

**Простое объяснение:**
Любое знание — это структура, которую мы можем разобрать на детали.

**Аналогия:**
Постижение истины похоже на сборку древнего механизма: сначала смотрим на общую форму, потом на каждую шестеренку.

**Визуальная схема:**
[ Вопрос ] -> [ Анализ ] -> [ Понимание ]

**Пошаговая логика:**
1. Мы берем твою проблему.
2. Ищем связь с тем, что ты уже знаешь.
3. Строим новый логический мостик.

**Пример:**
Когда ты учишь новое слово, ты привязываешь его к образу в голове.

**Мини-схема:**
❓ -> 💡 -> ✅

**Вопрос:**
Какую именно часть этой темы нам стоит разобрать подробнее прямо сейчас?

**Ободрение:**
Твоя любознательность — твой главный компас. Я здесь, чтобы помочь тебе не сбиться с пути!`;
    }

    return { content };
  }
}

class RealAIProvider implements ProviderImplementation {
  constructor(private name: AIProvider) {}
  async generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>> {
    return {
      content: `[Анализ через ${this.name}] Магистр обрабатывает ваш запрос... (Здесь будет ответ от реальной нейросети согласно системному промпту)`,
      usage: { promptTokens: 50, completionTokens: 150 }
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
    session.messages.push({ role: 'user', content: input, timestamp: Date.now() });

    const provider = this.providers[providerType];
    const result = await provider.generateResponse(input, session.messages, profile);

    const response: AIResponse = {
      content: result.content || "Связь с Магистром прервана. Проверьте эфир.",
      provider: providerType,
      usage: result.usage
    };

    session.messages.push({ role: 'assistant', content: response.content, timestamp: Date.now() });
    return response;
  }

  clearSession(username: string) {
    delete this.sessions[username];
  }
}

export const aiTutorService = new TutorService();
