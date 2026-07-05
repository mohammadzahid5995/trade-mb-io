import { test, expect }
    from '@playwright/test';

import { tradingPage }
    from '../../pages/TradingPage';

test.describe('Trading', () => {

    test.beforeEach(async ({ page }) => {

        // deterministic desktop viewport for trading tests
        await page.setViewportSize({ width: 1280, height: 720 });

        test('TRD001 trading widget',
            async ({ page }) => {

                await expect(
                    tradingPage(page)
                        .tradingWidget()
                ).toBeVisible();
            });


        test('TRD002 spot trading section renders and displays trading pairs',
            async ({ page }) => {

                await expect(
                    tradingPage(page)
                        .spotTradingSection()
                ).toBeVisible();

                const symbols = [
                    'MBG',
                    'BTC',
                    'ETH',
                    'SOL',
                    'XRP',
                    'ADA',
                    'XLM',
                    'DOGE',
                    'TRX',
                    'AVAX',
                    'LTC',
                    'LINK',
                    'BCH',
                    'AAVE',
                    'UNI'
                ];

                const trading = tradingPage(page);

                for (const symbol of symbols) {
                    await test.step(`Verify ${symbol} row and cells`, async () => {
                        const row = trading.row(symbol);

                        await expect(row).toBeVisible();

                        await expect(trading.priceFor(symbol)).toBeVisible();

                        await expect(trading.changeFor(symbol)).toBeVisible();

                        const chartGraphic = trading.chartFor(symbol).locator('svg, canvas, img').first();
                        await expect(chartGraphic).toBeVisible();
                    });
                }
            });
        test('TRD003 trading pair entries contain expected data fields',
            async ({ page }) => {

                const trading = tradingPage(page);

                const symbols = [
                    'MBG', 'BTC', 'ETH', 'SOL', 'XRP',
                    'ADA', 'XLM', 'DOGE', 'TRX', 'AVAX',
                    'LTC', 'LINK', 'BCH', 'AAVE', 'UNI'
                ];

                for (const symbol of symbols) {
                    await test.step(`Row for ${symbol} contains expected fields`, async () => {
                        const row = trading.row(symbol);

                        // Display name cell (scoped to first td)
                        await expect(trading.nameCellFor(symbol)).toBeVisible();

                        // Price cell presence
                        await expect(trading.priceFor(symbol)).toBeVisible();

                        // Change/percent cell presence
                        await expect(trading.changeFor(symbol)).toBeVisible();

                        // Chart cell should contain a graphic element (svg, canvas or img)
                        const chartGraphic = trading.chartFor(symbol).locator('svg, canvas, img').first();
                        await expect(chartGraphic).toBeVisible();
                    });
                }
            });

        test('TRD004 trading pairs are correctly grouped into categories',
            async ({ page }) => {

                const trading = tradingPage(page);

                const categories = [
                    {
                        name: 'Hot',
                        tab: trading.hotTab()
                    },
                    {
                        name: 'Gainers',
                        tab: trading.gainersTab()
                    },
                    {
                        name: 'Losers',
                        tab: trading.losersTab()
                    }
                ];

                for (const category of categories) {

                    await test.step(
                        `Verify ${category.name} category`,
                        async () => {

                            // Verify category button exists
                            await expect(category.tab)
                                .toBeVisible();

                            // Select category
                            await category.tab.click();

                            // Verify at least one trading pair is displayed
                            await expect(
                                trading.tradingRows()
                            ).toBeVisible();

                            // Verify first trading pair has expected fields
                            const firstRow =
                                page.locator('tr').first();

                            await expect(
                                firstRow.locator('td').nth(0)
                            ).toBeVisible();

                            await expect(
                                firstRow.locator('td').nth(1)
                            ).toBeVisible();

                            await expect(
                                firstRow.locator('td').nth(2)
                            ).toBeVisible();

                            await expect(
                                firstRow.locator('td').nth(3)
                            ).toBeVisible();
                        }
                    );
                }
            });
    });
});