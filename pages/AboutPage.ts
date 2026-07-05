import { Page, Locator } from '@playwright/test';

export const aboutPage = (page: Page) => ({

    openAboutPage: async () => {
        await page.goto('/company');
    },

    heading: (name: string | RegExp) =>
        page.getByRole('heading', { name }),

    sectionByHeading: (
        heading: string | RegExp
    ) =>
        page
            .locator('section')
            .filter({
                has: page.getByRole(
                    'heading',
                    { name: heading }
                )
            })
            .first(),

    textInSection: (
        heading: string | RegExp
    ) =>
        aboutPage(page)
            .sectionByHeading(heading)
            .locator('p, div, span')
            .first(),

    graphicInSection: (
        heading: string | RegExp
    ) =>
        aboutPage(page)
            .sectionByHeading(heading)
            .locator(
                'img,svg,picture'
            )
            .first(),
});