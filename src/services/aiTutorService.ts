import { EducationStage } from '../store/useUserStore';

interface TutorProfile {
  username: string;
  age: string;
  educationStage: EducationStage;
  learningStyle: string;
}

export const generateTutorResponse = (
  input: string,
  userProfile: TutorProfile,
  context?: string
): string => {
  const { username, educationStage, age } = userProfile;
  const lowerInput = input.toLowerCase();

  // Basic context-aware logic
  const isChild = educationStage === 'Начальная школа' || parseInt(age) < 12;
  const isStudent = educationStage === 'Студент' || educationStage === 'Взрослый / самообразование';

  const tone = isChild
    ? 'дружелюбный и простой, использующий много эмодзи и сказочных метафор'
    : isStudent
    ? 'профессиональный, глубокий и академический'
    : 'вдохновляющий, современный и четкий';

  // Mock response generation based on common patterns
  if (lowerInput.includes('привет') || lowerInput.includes('здравствуй')) {
    if (isChild) return `Привет, ${username}! 🌟 Я твой Магистр Знаний. Готов отправиться в увлекательное путешествие по миру знаний сегодня?`;
    return `Приветствую вас, ${username}. Я к вашим услугам. Какую область знаний мы будем исследовать сегодня?`;
  }

  if (lowerInput.includes('зачем') || lowerInput.includes('почему')) {
    return `Отличный вопрос, ${username}! Понимание "почему" — это первый шаг к истинной мудрости. В контексте ${context || 'нашего обучения'} это позволяет нам видеть связи между вещами.`;
  }

  if (lowerInput.includes('сложно') || lowerInput.includes('не понимаю')) {
    if (isChild) return `Не переживай, ${username}! ✨ Даже великие волшебники не всё понимали сразу. Давай попробуем разобрать это на примере игрушек или конфет?`;
    return `Это естественный этап обучения, ${username}. Глубокие знания требуют времени. Позвольте мне объяснить эту концепцию с другой стороны.`;
  }

  if (lowerInput.includes('спасибо')) {
    return `Всегда пожалуйста, ${username}! Твой прогресс — лучшая награда для Магистра. Продолжай в том же духе! 🚀`;
  }

  // Default varied responses
  const fallbacks = [
    `Интересная мысль, ${username}. Если рассматривать это через призму ${context || 'нашего предмета'}, мы увидим много скрытых деталей.`,
    `Ваш вопрос достоин настоящего искателя истины. Давайте углубимся в детали.`,
    `Как ваш наставник, я рекомендую обратить внимание на основы этой темы, прежде чем двигаться дальше.`,
    `Прекрасно! Именно такое любопытство ведет к великим открытиям в Ордене Знаний.`
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

// Placeholder for future real AI integration
export const callAIProvider = async (prompt: string, provider: 'openai' | 'gemini' | 'claude' = 'openai') => {
  console.log(`Calling ${provider} with prompt: ${prompt}`);
  // Implementation will go here
  return null;
};
