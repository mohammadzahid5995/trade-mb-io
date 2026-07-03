import { Page } from '@playwright/test';

export const tradingPage = (page: Page) => ({

    tradingWidget: () =>
        page.getByText(
            "Today's Top Crypto Prices"
        ),

    btc: () =>
        page.getByText('BTC'),

    eth: () =>
        page.getByText('ETH'),

    doge: () =>
        page.getByText('DOGE'),

    dot: () =>
        page.getByText('DOT'),

    mbg: () =>
        page.getByText('MBG')
});