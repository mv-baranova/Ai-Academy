import { test, expect } from '@playwright/test';

test('verify rebooted app', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Wait for onboarding
  await page.waitForSelector('h2:has-text("Добро пожаловать в Орден")');
  await page.screenshot({ path: 'screenshot_onboarding_new.png' });

  // Complete onboarding
  await page.click('button:has-text("Начать путь")');
  await page.fill('input[placeholder="Твой позывной..."]', 'Детектив');
  await page.click('button:has-text("Далее")');
  await page.click('button:has-text("Средняя школа")');
  await page.click('button:has-text("Следователь смыслов")');
  await page.click('button:has-text("Через истории и кейсы")');
  await page.click('button:has-text("Войти в Орден")');

  // Wait for main dashboard
  await page.waitForSelector('h1:has-text("Орден")');
  await page.screenshot({ path: 'screenshot_dashboard_new.png' });

  // Open a subject
  await page.click('button:has-text("Математика")');
  await page.waitForSelector('h3:has-text("Архив")');
  await page.screenshot({ path: 'screenshot_math_archive.png' });

  // Start an investigation
  await page.click('button:has-text("Дело №01: Тайный код пиццы")');
  await page.waitForSelector('h4:has-text("Интрига")');
  await page.screenshot({ path: 'screenshot_investigation_step1.png' });

  // Open Magister Tutor
  await page.click('button:has-text("Спросить Магистра")');
  await page.waitForSelector('h2:has-text("Магистр Знаний")');
  await page.screenshot({ path: 'screenshot_magister_tutor_new.png' });
});
