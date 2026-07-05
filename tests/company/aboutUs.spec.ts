import { test, expect } from '@playwright/test';

import { aboutPage } from '../../pages/AboutPage';

test.describe('About / Company page', () => {

    test.beforeEach(async ({ page }) => {
        // deterministic viewport for About page tests
        await page.setViewportSize({ width: 1280, height: 720 });
        await aboutPage(page).openAboutPage();
    });

    test('ABOUT001 Why MultiBank page renders expected components and text',
        async ({ page }) => {

            const about = aboutPage(page);

            const sections = [
                'Why MultiBank Group?',
                'A tradition of global leadership',
                'Innovation with purpose',
                'Integrity built into every decision'
            ];

            for (const heading of sections) {

                await test.step(
                    `Verify section "${heading}"`,
                    async () => {

                        // heading exists
                        await expect(
                            about.heading(heading)
                        ).toBeVisible();

                        // section exists
                        const section =
                            about.sectionByHeading(heading);

                        await expect(section)
                            .toBeVisible();

                        // descriptive text exists
                        const text =
                            about.textInSection(heading);

                        await expect(text)
                            .toBeVisible();

                        const content =
                            await text.textContent();

                        expect(
                            content?.trim().length
                        ).toBeGreaterThan(20);

                        // graphic exists
                        await expect(
                            about.graphicInSection(heading)
                        ).toBeVisible();
                    }
                );
            }
        });
});
