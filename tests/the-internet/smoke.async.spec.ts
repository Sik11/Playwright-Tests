import { test, expect } from '@playwright/test';

test.describe('The Internet - JavaScript Dynamic Loading @smoke', () => {

    test('dynamic loading shows Hello World after Start @smoke', async ({ page }) => {
        await page.goto('/dynamic_loading/1');

        // Optional page identity check (keep it minimal)
        await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();

        await page.getByRole('button', { name: 'Start' }).click();

        // Wait for async work to complete (spinner disappears)
        await expect(page.locator('#loading')).toBeHidden({ timeout: 15_000 });

        const finish = page.locator('#finish');
        await expect(finish).toBeVisible();
        await expect(finish).toHaveText('Hello World!');
    });

});