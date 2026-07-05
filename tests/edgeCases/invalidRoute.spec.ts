import test, { expect } from "@playwright/test";
import { homePage } from "../../pages/HomePage";

test.describe('Invalid Routes', () => {

    test.beforeEach(async ({ page }) => {
        // deterministic desktop viewport for these tests
        await page.setViewportSize({ width: 1280, height: 720 });
        await homePage(page).openHomePage();
    });

    test('INVALID001 displays custom 404 page',
        async ({ page }) => {

            await page.goto('/this-route-does-not-exist');

            await expect(
                page.getByText(/404|page not found/i)
            ).toBeVisible();
        });

    test('INVALID002 invalid route displays fallback page or redirects',
        async ({ page }) => {

            await page.goto('/this-route-does-not-exist');

            const url = page.url();
            const pathname = new URL(url).pathname;

            const isFallback = /404|not-found/i.test(pathname) ||
                pathname === '/' ||
                // allow localized root like /en-AE
                /^\/[a-z]{2}-[A-Z]{2}(?:\/|$)/.test(pathname) ||
                pathname.includes('explore') ||
                pathname.includes('home');

            expect(isFallback).toBe(true);
        });

    test('INVALID003 invalid route displays meaningful content',
        async ({ page }) => {

            await page.goto('/this-route-does-not-exist');

            await expect(
                page.locator('body')
            ).toContainText(/\w+/);
        });

    test('INVALID004 invalid route does not expose technical errors',
        async ({ page }) => {

            await page.goto('/this-route-does-not-exist');

            const body =
                await page.locator('body').textContent();

            expect(body)
                .not.toMatch(
                    /stack trace|exception|internal server error|referenceerror/i
                );
        });

    test('INVALID005 user can navigate away from invalid route',
        async ({ page }) => {

            await page.goto('/this-route-does-not-exist');

            await page.goto('/');
            await page.waitForLoadState('domcontentloaded');

            const newPath = new URL(page.url()).pathname;
            // accept '/', localized root like '/en-AE', or other known home paths
            expect(newPath).toMatch(/^(?:\/$|\/[a-z]{2}-[A-Z]{2}(?:\/|$))/);
        });
});