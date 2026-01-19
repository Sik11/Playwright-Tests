import { test, expect } from '@playwright/test';

test.describe('The Internet - Controls @smoke', () => {
    
    test('checkboxes can be toggled @smoke', async ({ page }) => {
        await page.goto('/checkboxes');

        const checkboxes = page.locator('input[type="checkbox"]');
        await expect(checkboxes).toHaveCount(2);

        const first = checkboxes.nth(0);
        const second = checkboxes.nth(1);
    
        // Deterministic end-state (stable)
        await first.check();
        await expect(first).toBeChecked();
    
        await second.uncheck();
        await expect(second).not.toBeChecked();
    });

    test('dropdown selection updates value @smoke', async ({ page }) => {
        await page.goto('/dropdown');

        const dropdown = page.locator('#dropdown');

        await dropdown.selectOption('1');
        await expect(dropdown).toHaveValue('1');

        await dropdown.selectOption('2');
        await expect(dropdown).toHaveValue('2');
    });

});
    
    

