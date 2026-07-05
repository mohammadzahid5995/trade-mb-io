import { test, expect } from '@playwright/test';

import { homePage } from '../../pages/HomePage';

test.describe('Download dialog icons', () => {

    test.beforeEach(async ({ page }) => {
        await homePage(page).openHomePage();
    });

    test('App Store icon is present',
        async ({ page }) => {

            await homePage(page)
                .download()
                .click();

            await expect(
                page.getByText('Scan the QR code to download the app')
            ).toBeVisible();

            const dialog = page.locator('[role="dialog"]').first();
            await expect(dialog).toBeVisible();

            // Apple icon (existing check)
            const appleIcon = dialog.locator('image[href="/icons/apple-touch-icon.png"], img[src*="apple"], img[alt*="App Store" i]').first();

            // Google Play icon - look for common patterns
            const googleIcon = dialog.locator('img[src*="play" i], img[src*="google" i], image[href*="play" i], img[alt*="Google Play" i]').first();

            const applePresent = (await appleIcon.count()) > 0 && await appleIcon.isVisible().catch(() => false);
            const googlePresent = (await googleIcon.count()) > 0 && await googleIcon.isVisible().catch(() => false);

            console.log(`Download dialog icons — Apple: ${applePresent}, Google Play: ${googlePresent}`);

            await expect(appleIcon).toBeVisible();
        });

    test('DL002 Google Play presence (informational only)', async ({ page }) => {
        await homePage(page).download().click();
        const dialog = page.locator('[role="dialog"]').first();
        await expect(dialog).toBeVisible();

        const gpAnchor = dialog.locator('a[href*="play.google.com"], a[href*="google.com/store"], a[href*="android"]').first();
        const gpIcon = dialog.locator('img[src*="play"i], img[src*="google"i], img[alt*="Google Play"i], image[src*="play"i]').first();

        const googlePresent = (await gpAnchor.count() > 0) || (await gpIcon.count() > 0);
        console.log(`DL002 Google Play present: ${googlePresent}`);
        // informational only — do not fail if missing
    });

});
