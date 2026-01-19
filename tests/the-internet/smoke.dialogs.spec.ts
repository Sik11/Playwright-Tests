import { test, expect } from '@playwright/test';

test.describe('The Internet - JavaScript Dialogs @smoke', () => {


    test('handles JS alert @smoke', async ({ page }) => {
        await page.goto('/javascript_alerts');

        page.once('dialog', async (dialog) => {
            // console.log('Dialog type:', dialog.type());
            expect(dialog.type()).toBe('alert');
            await dialog.accept();
        });

        await page.getByRole('button', { name: 'Click for JS Alert' }).click();
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });



    test('handles JS confirm @smoke', async ({ page }) => {
        await page.goto('/javascript_alerts');

        page.once('dialog', async (dialog) => {
            // console.log('Dialog type:', dialog.type());
            expect(dialog.type()).toBe('confirm');
            await dialog.dismiss();
        });

        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });



    test('handles JS prompt @smoke', async ({ page }) => {
        await page.goto('/javascript_alerts');
        
        page.once('dialog', async (dialog) => {
            // console.log('Dialog type:', dialog.type());
            expect(dialog.type()).toBe('prompt');
            await dialog.accept('SmokeTest');
        });

        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
        await expect(page.locator('#result')).toContainText('You entered: SmokeTest');
    });

});