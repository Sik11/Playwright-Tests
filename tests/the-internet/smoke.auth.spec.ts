import { test, expect } from '@playwright/test';

test.describe('The Internet - Authentication @smoke', () => {
    
    test('login succeeds with valid credentials @smoke', async ({ page }) => {
        await page.goto('/login');

        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/\/secure/);

        // Verify core secure-area signals
        await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();

        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

        // Flash message has extra whitespace and a close "×", so use contains
        
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    });
    
    test('login fails with invalid password @smoke', async ({ page }) => {
        await page.goto('/login');

        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('wrong-password');

        await page.getByRole('button', { name: /Login/ }).click();

        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
        await expect(page.locator('#flash')).toContainText('Your password is invalid!');

        // Optional “defense in depth”:
        await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
    });

});
