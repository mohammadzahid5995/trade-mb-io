import { Page } from '@playwright/test';

export const homePage = (page: Page) => ({

    openHomePage: async () => {
        await page.goto('https://mb.io/en-AE');
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
        page.locator("xpath=(//div[@type='button'])[1]"),

    download: () =>
        page.locator('[data-slot="popover-trigger"]').nth(1)
});
