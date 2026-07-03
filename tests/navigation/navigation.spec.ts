import { test, expect }
    from '@playwright/test';

import { homePage } from '../../pages/HomePage';

test.describe('Navigation', () => {

    test.beforeEach(async ({ page }) => {

        await homePage(page)
            .openHomePage();
    });

    test('NAV002 logo visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .logo()
            ).toBeVisible();
        });

    test('NAV003 menu visible',
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

    test('NAV004 sign in visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .signIn()
            ).toBeVisible();
        });

    test('NAV005 sign up visible',
        async ({ page }) => {

            await expect(
                homePage(page)
                    .signUp()
            ).toBeVisible();
        });

    test('should navigate to explore page',
        async ({ page }) => {

            await homePage(page)
                .explore()
                .click();

            await expect(page)
                .toHaveURL(/explore/i);

            await expect(
                page.getByText('Markets at your fingertips')
            ).toBeVisible();
        });

    test('should navigate to features page',
        async ({ page }) => {

            await homePage(page)
                .features()
                .click();

            await expect(page)
                .toHaveURL(/features/i);

            await expect(
                page.getByText('The power of crypto is yours')
            ).toBeVisible();
        });

    test('should navigate to otcDesk page',
        async ({ page }) => {

            await homePage(page)
                .otcDesk()
                .click();

            await expect(page)
                .toHaveURL(/otc-desk/i);

            await expect(
                page.getByText('Trade with the #1 OTC Desk in the UAE')
            ).toBeVisible();
        });

    test('should navigate to company page',
        async ({ page }) => {

            await homePage(page)
                .company()
                .click();

            await expect(page)
                .toHaveURL(/company/i);

            await expect(
                page.getByText('Why MultiBank Group?')
            ).toBeVisible();
        });

    test('should navigate to support page',
        async ({ page }) => {

            await homePage(page)
                .support()
                .click();

            await expect(page)
                .toHaveURL(/support/i);

            await expect(
                page.getByText('Got questions?')
            ).toBeVisible();
        });

    test('should navigate to $MBG page',
        async ({ page }) => {

            const [popup] = await Promise.all([
                page.waitForEvent('popup'),
                homePage(page)
                    .mbg()
                    .click(),
            ]);

            await expect(popup)
                .toHaveURL(/https:\/\/token\.multibankgroup\.com\/en-AE\/?(\?.*)?$/);

            await expect(
                popup.getByText('Issued by MultiBank Group, $MBG', { exact: false }).first()
            ).toBeVisible();
        });

    test('should navigate to sign in page',
        async ({ page }) => {

            const [popup] = await Promise.all([
                page.waitForEvent('popup'),
                homePage(page)
                    .signIn()
                    .click(),
            ]);

            await expect(popup)
                .toHaveURL(/https:\/\/trade\.mb\.io\/login(\?.*)?$/);

            await expect(
                popup.getByRole('button', { name: 'Log In' })
            ).toBeVisible();
        });

    test('should navigate to sign up page',
        async ({ page }) => {

            const [popup] = await Promise.all([
                page.waitForEvent('popup'),
                homePage(page)
                    .signUp()
                    .click(),
            ]);

            await expect(popup)
                .toHaveURL(/https:\/\/trade\.mb\.io\/register(\?.*)?$/);

            await expect(
                popup.getByRole('heading', { name: 'Create account' })
            ).toBeVisible();
        });

});


