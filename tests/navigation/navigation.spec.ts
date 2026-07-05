import { test, expect, Locator, Page } from '@playwright/test';

import { homePage } from '../../pages/HomePage';

const clickVisible = async (locator: Locator) => {
    await locator.waitFor({ state: 'visible', timeout: 30000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.page().waitForTimeout(100);
    await locator.click({ timeout: 45000 });
};

const clickAndWaitForNavigationOrPopup = async (page: Page, locator: Locator) => {
    const popupPromise = page.waitForEvent('popup', { timeout: 12000 }).catch(() => null);

    await clickVisible(locator);

    const popup = await popupPromise;
    if (!popup) {
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => null);
    }

    return { popup };
};

test.describe('Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await homePage(page).openHomePage();
    });

    test('NAV001 logo visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .logo()
            ).toBeVisible();
        });

    test('NAV002 menu visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .explore()
            ).toBeVisible();

            await expect(
                homePage(page)
                    .features()
            ).toBeVisible();

            await expect(
                homePage(page)
                    .otcDesk()
            ).toBeVisible();

            await expect(
                homePage(page)
                    .company()
            ).toBeVisible();

            await expect(
                homePage(page)
                    .support()
            ).toBeVisible();
        });

    test('NAV002b navigation displays correctly at desktop viewport sizes',
        async ({ page }) => {

            await homePage(page).openHomePage();

            await expect(
                homePage(page).logo()
            ).toBeVisible();

            await expect(
                homePage(page).explore()
            ).toBeVisible();

            await expect(
                homePage(page).features()
            ).toBeVisible();

            await expect(
                homePage(page).otcDesk()
            ).toBeVisible();

            await expect(
                homePage(page).company()
            ).toBeVisible();

            await expect(
                homePage(page).support()
            ).toBeVisible();

            await expect(
                homePage(page).globe()
            ).toBeVisible();

            await expect(
                homePage(page).download()
            ).toBeVisible();
        });

    test('NAV003 sign in visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .signIn()
            ).toBeVisible();
        });

    test('NAV004 sign up visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .signUp()
            ).toBeVisible();
        });

    test('NAV005 globe visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .globe()
            ).toBeVisible();
        });

    test('NAV006 QR visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .download()
            ).toBeVisible();
        });

    test('NAV007 should navigate to explore page',
        async ({ page }) => {

            await clickVisible(homePage(page).explore());

            await expect(page)
                .toHaveURL(/explore/i);

            await expect(
                page.getByText('Markets at your fingertips')
            ).toBeVisible();
        });

    test('NAV008 should navigate to features page',
        async ({ page }) => {

            await clickVisible(homePage(page).features());

            await expect(page)
                .toHaveURL(/features/i);

            await expect(
                page.getByText('The power of crypto is yours')
            ).toBeVisible();
        });

    test('NAV009 should navigate to otcDesk page',
        async ({ page }) => {

            await clickVisible(homePage(page).otcDesk());

            await expect(page)
                .toHaveURL(/otc-desk/i);

            await expect(
                page.getByText('Trade with the #1 OTC Desk in the UAE')
            ).toBeVisible();
        });

    test('NAV010 should navigate to company page',
        async ({ page }) => {

            await clickVisible(homePage(page).company());

            await expect(page)
                .toHaveURL(/company/i);

            await expect(
                page.getByText('Why MultiBank Group?')
            ).toBeVisible();
        });

    test('NAV011 should navigate to support page',
        async ({ page }) => {

            await clickVisible(homePage(page).support());

            await expect(page)
                .toHaveURL(/support/i);

            await expect(
                page.getByText('Got questions?')
            ).toBeVisible();
        });

    test('NAV012 should navigate to $MBG page',
        async ({ page }) => {

            const { popup } = await clickAndWaitForNavigationOrPopup(page, homePage(page).mbg());
            const target = popup ?? page;

            await expect(target)
                .toHaveURL(/token\.multibankgroup\.com\/en-AE/i);

            await expect(
                target.getByText('Issued by MultiBank Group, $MBG', { exact: false }).first()
            ).toBeVisible();
        });

    test('NAV013 should navigate to sign in page',
        async ({ page }) => {

            const { popup } = await clickAndWaitForNavigationOrPopup(page, homePage(page).signIn());
            const target = popup ?? page;

            await expect(target)
                .toHaveURL(/trade\.mb\.io\/login/i);

            await expect(
                target.getByRole('button', { name: 'Log In' })
            ).toBeVisible();

            await expect(
                target.getByLabel('Email address*')
            ).toBeVisible();

            await expect(
                target.getByLabel('Password*')
            ).toBeVisible();

            await expect(
                target.getByRole('link', { name: 'Forgot Password?' })
            ).toHaveAttribute('href', '/forgot-password');

            const signUpLink = target.locator('a', { hasText: 'Sign up' }).first();

            await expect(signUpLink).toBeVisible();
            await expect(signUpLink).toHaveAttribute('rel', 'noreferrer nopener');

            await expect(
                target.getByRole('button', { name: 'Sign up' })
            ).toBeVisible();
        });

    test('NAV014 should navigate to sign up page',
        async ({ page }) => {

            const { popup } = await clickAndWaitForNavigationOrPopup(page, homePage(page).signUp());
            const target = popup ?? page;

            await expect(target)
                .toHaveURL(/trade\.mb\.io\/register/i);

            await expect(
                target.getByRole('heading', { name: 'Create account' })
            ).toBeVisible();

            await expect(
                target.getByLabel('Email address*')
            ).toBeVisible();

            await expect(
                target.getByLabel('Password*')
            ).toBeVisible();

            await expect(
                target.getByRole('button', { name: 'Next' })
            ).toBeVisible();

            await expect(
                target.getByRole('link', { name: 'Privacy Policy' })
            ).toHaveAttribute('href', 'https://mb.io/en-AE/about/privacy-policy-gcc');

            await expect(
                target.getByRole('link', { name: 'Privacy Policy' })
            ).toHaveAttribute('target', '_blank');

            await expect(
                target.getByRole('link', { name: 'Privacy Policy' })
            ).toHaveAttribute('rel', 'noopener noreferrer');

            await expect(
                target.getByRole('link', { name: 'Log In' })
            ).toHaveAttribute('href', '/login');

            await expect(
                target.getByRole('button', { name: 'Redeem Referral' })
            ).toBeVisible();

        });

    test('NAV015 should open globe dropdown menu',
        async ({ page }) => {

            await clickVisible(homePage(page).globe());

            const countries = [
                'English',
                'Español',
                'Français',
                'Português',
                '繁體中文',
                'العربية',
                'Italiano',
                'Русский',
                '简体中文',
                'Deutsch',
                'Türkçe'
            ];

            for (const country of countries) {
                await expect(page.getByText(country)).toBeVisible();
            }
        });

    test('NAV016 should show QR menu',
        async ({ page }) => {

            await clickVisible(homePage(page).download());

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
});
