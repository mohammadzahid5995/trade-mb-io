import { Page, Locator } from '@playwright/test';

export const homePage = (page: Page) => ({

    openHomePage: async () => {
        // Use baseURL and networkidle so dynamic navigation elements are ready.
        await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForSelector('nav, [role="navigation"], header nav', { state: 'visible', timeout: 30000 });
    },

    logo: () =>
        page.getByRole('link', { name: 'Home', exact: true }).first(),

    explore: () =>
        page.getByRole('link', { name: 'Explore', exact: true }).first(),

    features: () =>
        page.getByRole('link', { name: 'Features', exact: true }).first(),

    otcDesk: () =>
        page.getByRole('link', { name: 'OTC Desk', exact: true }).first(),

    company: () =>
        page.getByRole('link', { name: 'Company', exact: true }).first(),

    support: () =>
        page.getByRole('link', { name: 'Support', exact: true }).first(),

    mbg: () =>
        page.getByRole('link', { name: '$MBG', exact: true }).first(),

    signIn: () =>
        page.getByRole('link', { name: 'Sign in', exact: true }).first(),

    signUp: () =>
        page.getByRole('link', { name: 'Sign up', exact: true }).first(),

    globe: () =>
        page.locator('[data-slot="popover-trigger"][aria-haspopup="dialog"]').filter({
            has: page.locator('svg')
        }).first(),

    download: () =>
        page.locator('[data-slot="popover-trigger"]').nth(1),

    banner: (): Locator =>
        page.locator('header, [role="banner"], .banner, [data-test="banner"]').first(),

    main: (): Locator =>
        page.locator('main, [role="main"], #main, [data-test="main"]').first()
});
