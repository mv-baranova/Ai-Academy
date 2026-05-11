const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEBAPP_URL;

if (!token && process.env.NODE_ENV !== 'test') {
  console.error('TELEGRAM_BOT_TOKEN is not defined in .env');
  // process.exit(1); // Commented out to allow node --check or similar if env not set
}

const bot = new Telegraf(token || 'DUMMY_TOKEN');

bot.start((ctx) => {
  ctx.reply(
    `Добро пожаловать в Nexus Academy! 🌌\n\nТвой путь к знаниям начинается здесь. Нажми на кнопку ниже, чтобы открыть академию.`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('Открыть Nexus Academy', webAppUrl || 'https://example.com')]
    ])
  );
});

if (process.env.NODE_ENV !== 'test') {
  bot.launch().then(() => {
    console.log('Bot is running...');
  });
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
