import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/HomePage';

// Allow slower page loads in CI or on slow networks
test.setTimeout(60000);

test.describe('Marketing Banners', () => {

    test.beforeEach(async ({ page }) => {
        // deterministic desktop viewport for these tests
        await page.setViewportSize({ width: 1280, height: 720 });
        await homePage(page).openHomePage();
    });

    test('MARK001 marketing banner renders',
        async ({ page }) => {

            const banner = homePage(page).banner();

            await expect(
                banner
            ).toBeVisible();
        });

    test('MARK002 marketing banner renders in the expected page region',
        async ({ page }) => {

            const home = homePage(page);
            const banner = home.banner();

            await expect(
                banner
            ).toBeVisible();

            const box =
                await banner.boundingBox();

            expect(box)
                .not.toBeNull();

            // Verify banner is rendered in the upper portion of page
            expect(box!.y)
                .toBeLessThan(800);
        });

    test('MARK003 marketing banner contains content',
        async ({ page }) => {

            const banner =
                homePage(page).banner();

            await expect(
                banner
            ).toBeVisible();

            const text =
                await banner.textContent();

            expect(
                text?.trim().length
            ).toBeGreaterThan(0);
        });

    test('MARK004 marketing banner contains a visible CTA',
    async ({ page }) => {

        const banner =
            homePage(page).banner();

        await expect(banner).toBeVisible();

        const cta =
            banner.locator(
                'a, button, [role="link"], [role="button"]'
            ).first();

        await expect(
            cta,
            'Banner should contain a visible CTA'
        ).toBeVisible();

        const href =
            await cta.getAttribute('href');

        if (href) {

            expect(href.trim().length)
                .toBeGreaterThan(0);

            expect(href)
                .not
                .toMatch(/^#|^javascript:/i);
        }
    });

    test('MARK005 banner degrades gracefully on mobile viewport',
    async ({ page }) => {

        await page.setViewportSize({
            width: 375,
            height: 812
        }).catch(() => null);

        await page.reload({
            waitUntil: 'networkidle',
            timeout: 60000
        });

        const banner = homePage(page).banner();
        const main = homePage(page).main();

        await banner.waitFor({ state: 'attached', timeout: 30000 }).catch(() => null);
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => null);

        // Either banner or main must be visible
        const bannerVisible =
            await banner.isVisible().catch(() => false);

        const mainVisible =
            await main.isVisible().catch(() => false);

        expect(
            bannerVisible || mainVisible
        ).toBeTruthy();
    });

    test('MARK006 marketing banner has semantic placement',
    async ({ page }) => {

        const banner =
            homePage(page).banner();

        await expect(banner).toBeVisible();

        const isSemanticallyPlaced =
            await banner.evaluate((el: HTMLElement) =>
                !!(
                    el.closest('header') ||
                    el.closest('[role="banner"]')
                )
            );

        expect(isSemanticallyPlaced).toBe(true);
    });
});