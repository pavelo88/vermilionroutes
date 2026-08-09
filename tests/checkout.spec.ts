import { test, expect } from '@playwright/test';

test('El flujo de booking carga correctamente y es interactivo', async ({ page }) => {
  await page.goto('/booking');
  const bookButton = page.locator('text=Reservar');
  await expect(bookButton).toBeVisible();
});
