import test, { expect } from "@playwright/test";
import { homePage } from "../../pages/HomePage";

test.describe('Broken Links', () => {

    test.beforeEach(async ({ page }) => {
        // deterministic desktop viewport for these tests
        await page.setViewportSize({ width: 1280, height: 720 });
        await homePage(page).openHomePage();
    });

    test('NAV-BROKEN-001 all navigation links have valid href attributes',
        async ({ page }) => {

            await homePage(page).openHomePage();

            // Wait for navigation area to render
            await page.waitForSelector('header a, nav a', { timeout: 10000 });

            const links = page.locator('header a, nav a');

            // Collect hrefs in-page to avoid per-locator timeouts
            const hrefs = await links.evaluateAll(nodes =>
                nodes.map(n => (n as HTMLAnchorElement).getAttribute('href'))
            );

            hrefs.forEach((href, i) => {
                expect(href, `Missing href at index ${i}`).not.toBeNull();
                expect(href, `Empty href at index ${i}`).not.toBe('');
            });
        });

    test('NAV-BROKEN-002 validate navigation links safely',
        async ({ page, request }) => {

            await homePage(page).openHomePage();

            const links =
                page.locator('header a, nav a');

            const hrefs =
                await links.evaluateAll(nodes =>
                    nodes.map(n =>
                        (n as HTMLAnchorElement).getAttribute('href')
                    )
                );

            for (const href of hrefs) {

                if (
                    !href ||
                    href.startsWith('mailto') ||
                    href.startsWith('tel') ||
                    href.startsWith('#')
                ) {
                    continue;
                }

                const url =
                    href.startsWith('http')
                        ? href
                        : new URL(href, page.url()).toString();

                const response =
                    await request.get(url);

                const status = response.status();

                const isExternal =
                    !url.includes('mb.io');

                // INTERNAL links must be healthy
                if (!isExternal) {
                    expect(
                        status,
                        `Broken internal link: ${url}`
                    ).toBeLessThan(400);
                }

                // EXTERNAL links: only flag hard failures (5xx)
                else {
                    expect(
                        status,
                        `External link failed badly: ${url}`
                    ).toBeLessThan(500);
                }
            }
        });

    test('NAV-BROKEN-003 navigation links return HTTP 200',
        async ({ page, request }) => {

            await homePage(page).openHomePage();

            await page.waitForSelector('header a, nav a', { timeout: 10000 });
            const links = page.locator('header a, nav a');

            const hrefs = await links.evaluateAll(nodes =>
                nodes.map(n => (n as HTMLAnchorElement).getAttribute('href'))
            );

            for (const href of hrefs) {
                if (!href || href.startsWith('mailto') || href.startsWith('tel')) continue;

                const url = href.startsWith('http') ? href : new URL(href, page.url()).toString();
                const response = await request.get(url);
                const status = response.status();
                const isExternal = !url.includes('mb.io');

                // INTERNAL links should return 200
                if (!isExternal) {
                    expect(status, `Broken internal link: ${url}`).toBe(200);
                } else {
                    // External links can return non-200 but should not be server errors (5xx)
                    expect(status, `External link failed badly: ${url}`).toBeLessThan(500);
                }
            }
        });

    test('NAV-BROKEN-004 navigation links render content',
        async ({ page }) => {

            await homePage(page).openHomePage();

            await page.waitForSelector('header a, nav a', { timeout: 10000 });
            const links = page.locator('header a, nav a');
            const firstLink = links.first();

            // Click and wait for navigation or content change
            const href = await firstLink.evaluate((n: HTMLAnchorElement) => n.getAttribute('href'));
            if (href) {
                if (href.startsWith('http') || href.startsWith('/')) {
                    await Promise.all([
                        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => null),
                        firstLink.click().catch(() => null)
                    ]);
                } else {
                    await firstLink.click().catch(() => null);
                }
            } else {
                await firstLink.click().catch(() => null);
            }

            await expect(page.locator('body')).not.toBeEmpty();
        });
});