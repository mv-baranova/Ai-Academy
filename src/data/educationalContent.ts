export interface Investigation {
  id: string;
  title: string;
  content: string;
  example?: string;
  quiz: QuizQuestion[];
  xp: number;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  visualElement?: 'fraction' | 'equation' | 'timeline' | 'map' | 'scheme';
  analogy?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
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
  math: {
    id: 'math',
    name: 'Математика: Шифры Вселенной',
    topics: [
      {
        id: 'fractions-patterns',
        title: 'Тайная жизнь долей',
        investigations: [
          {
            id: 'fractions-intro',
            title: 'Визуализация нецелого',
            content: 'Представь, что математика — это способ делить реальность на равные части без потери её сути. Дробь — это не просто числа, это пропорция силы. Когда мы пишем 1/2, мы говорим: "У нас есть один артефакт, разделенный на две равные зоны влияния".',
            analogy: 'Это как разрезать карту сокровищ: если у тебя 3/4, ты владеешь почти всем секретом, но одна деталь всё ещё скрыта.',
            visualElement: 'fraction',
            xp: 200,
            difficultyLevel: 'beginner',
            quiz: [
              {
                question: 'Если ты разделил кристалл энергии на 8 частей и взял 3 из них, как это запишется в коде Математики?',
                options: ['8/3', '3/8', '5/8', '1/3'],
                correctAnswer: 1,
                hint: 'Числитель (верхнее число) показывает, сколько частей у тебя в руках.'
              }
            ]
          }
        ]
      }
    ]
  },
  russian: {
    id: 'russian',
    name: 'Русский язык: Код Экспрессии',
    topics: [
      {
        id: 'grammar-stories',
        title: 'Эмоциональный синтаксис',
        investigations: [
          {
            id: 'participle-mystery',
            title: 'Причастный оборот: Ожившие действия',
            content: 'Причастие — это гибрид, рожденный от союза Глагола и Прилагательного. Оно позволяет добавить предмету динамики, превращая статичное описание в кадр из фильма. Вместо "Книга, которая лежит", мы используем "Книга, лежащая..." — и мир вокруг начинает двигаться.',
            analogy: 'Это как фильтр в Instagram, который добавляет движущиеся частицы на фото.',
            xp: 220,
            difficultyLevel: 'intermediate',
            quiz: [
              {
                question: 'Найдите в коде причастие: "Искатель, нашедший древний ключ, замер перед дверью".',
                options: ['Искатель', 'Нашедший', 'Замер', 'Древний'],
                correctAnswer: 1,
                hint: 'Ищите слово, которое отвечает на вопрос "какой?", но произошло от действия "найти".'
              }
            ]
          }
        ]
      }
    ]
  },
  history: {
    id: 'history',
    name: 'История: Архивы Времени',
    topics: [
      {
        id: 'world-war-mysteries',
        title: 'Тени Первой мировой',
        investigations: [
          {
            id: 'ww1-causes',
            title: 'Пороховой погреб Европы',
            content: 'В 1914 году мир напоминал сложный механизм, где одна сломанная шестерня вызвала крах всей системы. Убийство в Сараево было лишь искрой, но почему весь континент был готов вспыхнуть? Это было столкновение амбиций, страхов и тайных союзов, которые плелись десятилетиями.',
            analogy: 'Представь гигантскую игру в "Дженгу", где страны годами вытаскивали блоки стабильности, пока вся башня не рухнула от одного щелчка.',
            visualElement: 'timeline',
            xp: 300,
            difficultyLevel: 'intermediate',
            quiz: [
              {
                question: 'Что послужило формальным поводом (искрой) для начала великого столкновения?',
                options: ['Экономический кризис', 'Убийство Франца Фердинанда', 'Спор из-за колоний', 'Революция в России'],
                correctAnswer: 1,
                hint: 'Это событие произошло в Сараево и запустило цепочку ультиматумов.'
              }
            ]
          }
        ]
      }
    ]
  },
  english: {
    id: 'english',
    name: 'English: Global Communication',
    topics: [
      {
        id: 'modern-immersion',
        title: 'Real-life Logic',
        investigations: [
          {
            id: 'present-perfect-logic',
            title: 'Present Perfect: Bridge to the Now',
            content: 'Many struggle with this tense because they see it as "past". But in the Order, we see it as a "Result in the Present". It is the bridge between what happened and why it matters NOW. "I have lost my key" means the key is gone at this very moment.',
            analogy: 'Imagine a footprints leading to where you stand. You don\'t care about the walk, you care about the fact that you are HERE.',
            xp: 250,
            difficultyLevel: 'intermediate',
            quiz: [
              {
                question: 'Which sentence shows a result that is important right now?',
                options: ['I lost my key yesterday.', 'I have lost my key.', 'I was losing my key.', 'I lose my key every day.'],
                correctAnswer: 1,
                hint: 'Look for the "Have + V3" structure that connects the past action to the current state.'
              }
            ]
          }
        ]
      }
    ]
  }
};
