require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEBAPP_URL;

if (!token) {
  console.error('Ошибка: TELEGRAM_BOT_TOKEN не указан в .env файле');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply(
    'Добро пожаловать в Nexus Academy! Нажми кнопку ниже, чтобы открыть академию.',
    Markup.keyboard([
      Markup.button.webApp('Открыть Nexus Academy', webAppUrl || 'https://t.me/BotFather')
    ]).resize()
  );
});

bot.launch()
  .then(() => console.log('Бот Nexus Academy запущен!'))
  .catch((err) => console.error('Ошибка при запуске бота:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
