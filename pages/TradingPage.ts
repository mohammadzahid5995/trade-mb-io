import { Page } from '@playwright/test';

export const tradingPage = (page: Page) => ({

    openHomePage: async () => {
        await page.goto('https://mb.io/en-AE/explore');
    },

    tradingWidget: () =>
        page.getByText(
            "Today's Top Crypto Prices"
        ),

    mbg: () =>
        page.getByText('MBG'),

    btc: () =>
        page.getByText('BTC'),

    eth: () =>
        page.getByText('ETH'),

    sol: () =>
        page.getByText('SOL'),

    xrp: () =>
        page.getByText('XRP'),

    ada: () =>
        page.getByText('ADA'),

    xlm: () =>
        page.getByText('XLM'),

    doge: () =>
        page.getByText('DOGE'),

    trx: () =>
        page.getByText('TRX'),

    avax: () =>
        page.getByText('AVAX'),

    ltc: () =>
        page.getByText('LTC'),

    link: () =>
        page.getByText('LINK'),

    bch: () =>
        page.getByText('BCH'),

    aave: () =>
        page.getByText('AAVE'),

    uni: () =>
        page.getByText('UNI'),

    symbol: (name: string) =>
        page
            .locator('tr', { has: page.getByText(name, { exact: true }) })
            .getByText(name, { exact: true })
            .first(),

    row: (name: string) =>
        page.locator('tr', { has: page.getByText(name, { exact: true }) }).first(),

    priceFor: (name: string) =>
        page
            .locator('tr', { has: page.getByText(name, { exact: true }) })
            .locator('td')
            .nth(1),

    changeFor: (name: string) =>
        page
            .locator('tr', { has: page.getByText(name, { exact: true }) })
            .locator('td')
            .nth(2),

    chartFor: (name: string) =>
        page
            .locator('tr', { has: page.getByText(name, { exact: true }) })
            .locator('td')
            .nth(3),

    nameCellFor: (name: string) =>
        page
            .locator('tr', { has: page.getByText(name, { exact: true }) })
            .locator('td')
            .nth(0)
            .getByText(name, { exact: true })
            .first(),

    spotTradingSection: () =>
        page.getByText("Today's top crypto prices"),

    hotTab: () =>
        page.getByRole('button', { name: 'Hot' }),

    gainersTab: () =>
        page.getByRole('button', { name: 'Gainers' }),

    losersTab: () =>
        page.getByRole('button', { name: 'Losers' }),

    tradingRows: () =>
        page.locator('[class*="crypto"], tr').first()
});