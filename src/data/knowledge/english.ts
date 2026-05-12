import { CaseFileContent } from '../educationalContent';

export const englishContent: CaseFileContent = {
  id: 'english',
  name: 'Английский язык',
  topics: [
    {
      id: 'present-perfect',
      title: 'Present Perfect: Код Результата',
      investigations: [
        {
          id: 'pp-intro',
          title: 'Дело №21: Тайна Невидимого Моста',
          hook: 'Я потерял ключи вчера или я их потерял и стою перед закрытой дверью сейчас? В английском это две разные реальности. Твоя миссия — найти улику.',
          confusion: 'Думают, что это про прошлое. Но Present Perfect — это ВООБЩЕ не про прошлое. Это про СЕЙЧАС.',
          association: 'Это СВЕЖИЙ ОТПЕЧАТОК ноги на песке. Человек ушел (прошлое), но след мы видим сейчас (настоящее). Мост, соединяющий БЫЛО и ЕСТЬ.',
          visualScheme: '| model: Связь Времен | ПРОШЛОЕ : Действие завершено : rose | СЕЙЧАС : Улика / Результат : blue',
          explanation: 'Мы используем Have/Has + 3-ю форму, когда нам плевать на дату. Нам важен итог. "I have lost my keys" означает "Я сейчас не могу войти и злюсь". Это время-результат.',
          lifeExample: 'Если ты съел обед и сыт сейчас — это Present Perfect. Если ты ел вчера и сегодня снова голоден — это просто история (Past Simple).',
          miniTask: {
            question: 'Где результат важнее времени действия?',
            options: [
                'I bought a car in 1990',
                'I have bought a car (look!)',
                'I buy cars every day',
                'I will buy a car'
            ],
            correctAnswer: 1,
            hint: 'Ищи помощника "have" и результат в руках.'
          },
          verdict: 'Блестяще! Ты уловил пульс времени. Улика найдена.',
          memoryAnchor: 'Have + V3 = Прошлое дотянулось до настоящего рукой результата.',
          xp: 250
        }
      ]
    }
  ]
};
