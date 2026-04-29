import { expect, test } from "@playwright/test";

test("user can sign up, create a habit, complete it, and log out", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByTestId("splash-screen")).toBeVisible();
  await page.waitForURL("**/login");

  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByTestId("auth-signup-email").fill("e2e@example.com");
  await page.getByTestId("auth-signup-password").fill("password123!");
  await page.getByTestId("auth-signup-terms").check();
  await page.getByTestId("auth-signup-submit").click();

  await expect(page.getByTestId("dashboard-page")).toBeVisible();
  await page.getByTestId("create-habit-button").click();
  await page.getByTestId("habit-name-input").fill("Read");
  await page.getByTestId("habit-save-button").click();

  await expect(page.getByTestId("habit-card-read")).toBeVisible();
  await page.getByTestId("habit-complete-read").click();
  await expect(page.getByTestId("habit-streak-read")).toHaveText("1");

  await page.getByTestId("auth-logout-button").click();
  await expect(page).toHaveURL(/\/login$/);
});
