import { test, expect } from '@playwright/test';

test('Validate Next.js _next data register API', async ({ request }) => {
  const res = await request.get(
    'https://core-api.mb.io/api/v1/features'
  );

  // 1. Network success
  expect(res.ok()).toBeTruthy();
  expect(res.status()).toBe(200);

  // 2. Must be JSON
  const contentType = res.headers()['content-type'];
  expect(contentType).toContain('application/json');

  // 3. Parse body
  const body = await res.json();

  // 4. Basic sanity check
  expect(body).toBeTruthy();
  expect(typeof body).toBe('object');
});