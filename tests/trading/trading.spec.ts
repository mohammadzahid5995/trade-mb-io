import { test, expect }
    from '@playwright/test';

import { homePage }
    from '../../pages/HomePage';

import { tradingPage }
    from '../../pages/TradingPage';

test.describe('Trading', () => {

    test.beforeEach(async ({ page }) => {

        await homePage(page)
            .openHomePage();
    });

    test('TRD001 trading widget',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .tradingWidget()
            ).toBeVisible();
        });

    test('TRD002 BTC visible',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .btc()
            ).toBeVisible();
        });

    test('TRD003 ETH visible',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .eth()
            ).toBeVisible();
        });

    test('TRD004 DOGE visible',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .doge()
            ).toBeVisible();
        });

    test('TRD005 DOT visible',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .dot()
            ).toBeVisible();
        });

    test('TRD006 MBG visible',
        async ({ page }) => {

            await expect(
                tradingPage(page)
                    .mbg()
            ).toBeVisible();
        });
});