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
      content = `---CARD:СУТЬ---
Дроби — это Код Справедливости. Это не просто числа, это "инструкция по дележке мира".

---CARD:АССОЦИАЦИЯ---
Представь Кристалл Знаний. Если мы делим его на 4 части, а ты берешь одну — у тебя 1/4. Кусок зависит от "жадности толпы" внизу.

---CARD:ЛОГИЧЕСКАЯ ЦЕПЬ---
[ Весь Мир ] -> [ Разрез (Знаменатель) ] -> [ Твой Шанс (Числитель) ]

---CARD:МЕНТАЛЬНАЯ МОДЕЛЬ---
Чем БОЛЬШЕ число внизу, тем МЕНЬШЕ кусок в твоих руках. Знаменатель — это фильтр размера.

---CARD:ПРИМЕР---
1/2 пиццы (на двоих) = Пир.
1/100 пиццы (на толпу) = Крошки.

---CARD:ПРОВЕРЬ СЕБЯ---
Если я разрежу яблоко на 8 частей и дам тебе 3, какая доля реальности у тебя в руках?

---CARD:ЯКОРЬ---
Знаменатель — это Жадность. Числитель — это Добыча.

---CARD:СЛЕДУЮЩИЙ ШАГ---
Разбери "Дело №02: Слияние Реальностей" в Архиве Математики.`;
    } else if (lowerInput.includes('present perfect')) {
      content = `---CARD:СУТЬ---
Present Perfect — это Время-Улика. Оно соединяет то, что УЖЕ случилось, с тем, что мы чувствуем СЕЙЧАС.

---CARD:АССОЦИАЦИЯ---
Это как отпечаток ноги на мокром песке. Человек ушел (прошлое), но след виден сейчас (настоящее).

---CARD:ВИЗУАЛЬНЫЙ КОД---
[ ПРОШЛОЕ ] ========( МОСТ )========> [ СЕЙЧАС ]
(HAVE / HAS + V3)

---CARD:ЛОГИЧЕСКАЯ ЦЕПЬ---
Действие завершено -> Результат остался -> Мы видим его сейчас.

---CARD:СРАВНЕНИЕ---
I lost my keys (вчера, история).
I have lost my keys (сейчас стою под дождем, злюсь).

---CARD:ПРОВЕРЬ СЕБЯ---
Как ты скажешь "Я уже прочитал это", имея в виду, что теперь ты всё знаешь?

---CARD:ЯКОРЬ---
Have — это твой "рюкзак с результатами".

---CARD:СЛЕДУЮЩИЙ ШАГ---
Исследуй "Дело №21: Тайна Невидимого Моста" в Английском Бюро.`;
    } else {
      content = `---CARD:СУТЬ---
Любое знание — это структура. Чтобы её понять, мы разберем её на атомы логики.

---CARD:АССОЦИАЦИЯ---
Постижение истины — это сборка древнего артефакта. Сначала смотрим на форму, потом на каждую шестеренку.

---CARD:МЕНТАЛЬНАЯ МОДЕЛЬ---
[ Вопрос ] -> [ Дешифровка ] -> [ Инсайт ] -> [ Истина ]

---CARD:ВИЗУАЛЬНЫЙ КОД---
❓ -> 💡 -> ✅

---CARD:СОВЕТ МАГИСТРА---
Связывай новое с тем, что ты уже любишь (игры, кино, истории). Эмоции — лучший клей для нейронов.

---CARD:ПРОВЕРЬ СЕБЯ---
Какая именно деталь этой темы кажется тебе самой туманной прямо сейчас?

---CARD:ЯКОРЬ---
Знание — это сила контроля над миром.

---CARD:СЛЕДУЮЩИЙ ШАГ---
Выбери активное расследование в своем Главном Хабе.`;
    }

    return { content };
  }
}

class RealAIProvider implements ProviderImplementation {
  constructor(private name: AIProvider) {}
  async generateResponse(prompt: string, history: Message[], profile: TutorProfile): Promise<Partial<AIResponse>> {
    return {
      content: `---CARD:АНАЛИЗ---
Магистр (${this.name}) выполняет глубинную дешифровку твоего запроса... Подключаю когнитивные матрицы. Ожидай структурированный ответ в формате карточек.`,
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
