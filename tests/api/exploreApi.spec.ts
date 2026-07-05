import { test, expect } from '@playwright/test';

test('Validate market widget API response', async ({ request }) => {
  const response = await request.get(
    'https://core-api.mb.io/api/io/v1/market/widget'
  );

  // Status check
  expect(response.status()).toBe(200);

  // Ensure response is JSON
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('application/json');

  // Parse response
  const body = await response.json();

  // Basic sanity check (not empty)
  expect(body).toBeTruthy();
});