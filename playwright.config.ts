import { defineConfig, devices } from "@playwright/test";

/**
 * Tests run against the built static site, not the dev server: the build is
 * what Workers Builds deploys, and it keeps the suite off port 5173 so a dev
 * server can stay running. The password lock is the Worker's, tested on its
 * own with `bun run test:unit`.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4181",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "bun run build && bun run preview",
    url: "http://localhost:4181",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
