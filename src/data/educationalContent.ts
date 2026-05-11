export interface Lesson {
  id: string;
  title: string;
  content: string;
  example?: string;
  quiz: QuizQuestion[];
  xp: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface SubjectContent {
  id: string;
  name: string;
  topics: Topic[];
}

export const EDUCATIONAL_CONTENT: Record<string, SubjectContent> = {
  math: {
    id: 'math',
    name: 'Математика',
    topics: [
      {
        id: 'algebra-basics',
        title: 'Основы алгебры',
        lessons: [
          {
            id: 'linear-equations',
            title: 'Линейные уравнения',
            content: 'Линейное уравнение — это уравнение вида ax + b = 0, где a и b — некоторые числа, x — переменная. Решить его — значит найти такое значение x, при котором равенство становится верным.',
            example: '2x + 4 = 10. Вычитаем 4: 2x = 6. Делим на 2: x = 3.',
            xp: 150,
            quiz: [
              {
                question: 'Решите уравнение: 3x - 9 = 0',
                options: ['x = 2', 'x = 3', 'x = -3', 'x = 0'],
                correctAnswer: 1,
                hint: 'Перенесите -9 в правую часть с изменением знака, а затем разделите на 3.'
              }
            ]
          }
        ]
      }
    ]
  },
  russian: {
    id: 'russian',
    name: 'Русский язык',
    topics: [
      {
        id: 'orthography',
        title: 'Орфография',
        lessons: [
          {
            id: 'vowels-root',
            title: 'Гласные в корне',
            content: 'Безударные гласные в корне слова могут быть проверяемыми, непроверяемыми (словарные слова) и чередующимися. Для проверки нужно изменить слово так, чтобы гласный стал ударным.',
            example: 'Вода́ — во́ды, Трава́ — тра́вы.',
            xp: 120,
            quiz: [
              {
                question: 'В каком слове пропущена буква "О"?',
                options: ['Тр..ва', 'Д..ма', 'С..ды', 'П..рта'],
                correctAnswer: 1,
                hint: 'Проверочное слово для "дома" — "дом".'
              }
            ]
          }
        ]
      }
    ]
  },
  physics: {
    id: 'physics',
    name: 'Физика',
    topics: [
      {
        id: 'mechanics',
        title: 'Механика',
        lessons: [
          {
            id: 'newton-first-law',
            title: 'Первый закон Ньютона',
            content: 'Существуют такие системы отсчета, называемые инерциальными, относительно которых тела сохраняют свою скорость неизменной, если на них не действуют другие тела или действия других тел компенсируются.',
            example: 'Шайба, скользящая по гладкому льду, почти не замедляется.',
            xp: 200,
            quiz: [
              {
                question: 'Как называется свойство тел сохранять свою скорость?',
                options: ['Сила', 'Инерция', 'Трение', 'Ускорение'],
                correctAnswer: 1,
                hint: 'Это латинское слово, означающее "бездеятельность".'
              }
            ]
          }
        ]
      }
    ]
  },
  history: {
    id: 'history',
    name: 'История',
    topics: [
      {
        id: 'ancient-russia',
        title: 'Древняя Русь',
        lessons: [
          {
            id: 'rurik',
            title: 'Призвание варягов',
            content: 'Согласно "Повести временных лет", в 862 году славянские и финно-угорские племена призвали на княжение Рюрика с братьями Синеусом и Трувором.',
            example: 'Рюрик сел княжить в Новгороде, что стало началом династии Рюриковичей.',
            xp: 180,
            quiz: [
              {
                question: 'В каком году произошло призвание варягов?',
                options: ['988', '1147', '862', '1242'],
                correctAnswer: 2,
                hint: 'Это событие считается отправной точкой русской государственности в IX веке.'
              }
            ]
          }
        ]
      }
    ]
  },
  literature: {
    id: 'literature',
    name: 'Литература',
    topics: [
      {
        id: 'golden-age',
        title: 'Золотой век',
        lessons: [
          {
            id: 'pushkin-bio',
            title: 'А.С. Пушкин',
            content: 'Александр Сергеевич Пушкин — величайший русский поэт, создатель современного русского литературного языка. Его творчество охватывает все жанры.',
            example: 'Роман в стихах "Евгений Онегин" называют "энциклопедией русской жизни".',
            xp: 150,
            quiz: [
              {
                question: 'Какое произведение Пушкина написано в стихах и называется романом?',
                options: ['Капитанская дочка', 'Евгений Онегин', 'Дубровский', 'Метель'],
                correctAnswer: 1,
                hint: 'Белинский назвал это произведение "энциклопедией русской жизни".'
              }
            ]
          }
        ]
      }
    ]
  },
  english: {
    id: 'english',
    name: 'Английский язык',
    topics: [
      {
        id: 'grammar-tenses',
        title: 'Grammar: Tenses',
        lessons: [
          {
            id: 'present-simple',
            title: 'Present Simple',
            content: 'Мы используем Present Simple для регулярных действий, привычек или общеизвестных фактов. Для 3-го лица единственного числа (he, she, it) к глаголу добавляется окончание -s.',
            example: 'I go to school. She plays tennis.',
            xp: 130,
            quiz: [
              {
                question: 'Выберите правильную форму: He ... milk every morning.',
                options: ['drink', 'drinks', 'drinking', 'drank'],
                correctAnswer: 1,
                hint: 'Для He, She, It добавляем -s.'
              }
            ]
          }
        ]
      }
    ]
  },
  geography: {
    id: 'geography',
    name: 'География',
    topics: [
      {
        id: 'continents',
        title: 'Материки',
        lessons: [
          {
            id: 'eurasia',
            title: 'Евразия',
            content: 'Евразия — самый крупный материк на Земле, состоящий из двух частей света: Европы и Азии. Здесь проживает более 70% населения планеты.',
            example: 'Высочайшая точка Евразии и мира — гора Эверест (Джомолунгма).',
            xp: 140,
            quiz: [
              {
                question: 'На каком материке находится Россия?',
                options: ['Африка', 'Евразия', 'Северная Америка', 'Австралия'],
                correctAnswer: 1,
                hint: 'Это самый большой материк на планете.'
              }
            ]
          }
        ]
      }
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Химия',
    topics: [
      {
        id: 'periodic-table',
        title: 'Периодическая таблица',
        lessons: [
          {
            id: 'elements-symbols',
            title: 'Символы элементов',
            content: 'Каждый химический элемент имеет свой уникальный символ, состоящий из одной или двух латинских букв. Д.И. Менделеев систематизировал их в периодическую таблицу.',
            example: 'H — Водород, O — Кислород, Fe — Железо.',
            xp: 160,
            quiz: [
              {
                question: 'Какой символ соответствует Кислороду?',
                options: ['H', 'K', 'O', 'C'],
                correctAnswer: 2,
                hint: 'Символ происходит от латинского "Oxygenium".'
              }
            ]
          }
        ]
      }
    ]
  },
  biology: {
    id: 'biology',
    name: 'Биология',
    topics: [
      {
        id: 'cell-biology',
        title: 'Цитология (Клетка)',
        lessons: [
          {
            id: 'cell-structure',
            title: 'Строение клетки',
            content: 'Клетка — элементарная единица жизни. Основные части клетки: ядро (хранит ДНК), цитоплазма и мембрана.',
            example: 'Растительные клетки, в отличие от животных, имеют прочную клеточную стенку и хлоропласты.',
            xp: 150,
            quiz: [
              {
                question: 'Какая часть клетки отвечает за хранение генетической информации?',
                options: ['Мембрана', 'Цитоплазма', 'Ядро', 'Рибосома'],
                correctAnswer: 2,
                hint: 'Это "центр управления" клеткой.'
              }
            ]
          }
        ]
      }
    ]
  },
  informatics: {
    id: 'informatics',
    name: 'Информатика',
    topics: [
      {
        id: 'binary-system',
        title: 'Двоичная система',
        lessons: [
          {
            id: 'bits-bytes',
            title: 'Биты и байты',
            content: 'Вся информация в компьютере представлена в виде нулей и единиц. Бит — минимальная единица информации. 8 бит составляют 1 байт.',
            example: 'Число 2 в двоичной системе записывается как 10.',
            xp: 170,
            quiz: [
              {
                question: 'Сколько бит в одном байте?',
                options: ['4', '8', '10', '16'],
                correctAnswer: 1,
                hint: 'Вспомните стандартную группировку битов.'
              }
            ]
          }
        ]
      }
    ]
  }
};
