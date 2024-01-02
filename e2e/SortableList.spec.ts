import { test, expect } from '@playwright/test';
import { mockFailedFetch, mockSuccessfulFetch } from './support/network';

test.describe('SortableList', () => {
  test('should render and sort the items corectly', async ({ page }) => {
    await mockSuccessfulFetch(page);

    await page.goto('/');
    await expect(page).toHaveTitle(/Sortable List/);

    const posts = page.locator('div > [role="article"]');
    await expect(posts).toHaveCount(5);

    const firstPostDownButton = posts.nth(0).locator('button[aria-label="Move down"]');
    const secondPostDownButton = posts.nth(1).locator('button[aria-label="Move down"]');
    const fifthPostUpButton = posts.nth(4).locator('button[aria-label="Move up"]');

    await firstPostDownButton.click();
    let postTextAfterClicking = await posts.nth(0).textContent();

    expect(postTextAfterClicking).toEqual('Post 2');

    const actions = page.locator('div > .action');
    await expect(actions).toHaveCount(1);

    const firstActionText = await actions.first().textContent();
    expect(firstActionText).toContain('Moved post 1 from index 0 to index 1');

    await secondPostDownButton.click();
    postTextAfterClicking = await posts.nth(1).textContent();

    expect(postTextAfterClicking).toEqual('Post 3');

    await expect(actions).toHaveCount(2);
    const secondActionText = await actions.nth(0).textContent();
    expect(secondActionText).toContain('Moved post 1 from index 1 to index 2');

    await fifthPostUpButton.click();
    postTextAfterClicking = await posts.nth(4).textContent();

    expect(postTextAfterClicking).toEqual('Post 4');

    await expect(actions).toHaveCount(3);
    const thirdActionText = await actions.nth(0).textContent();
    expect(thirdActionText).toContain('Moved post 5 from index 4 to index 3');

    const postTexts = await posts.allTextContents();

    expect(postTexts).toEqual(['Post 2', 'Post 3', 'Post 1', 'Post 5', 'Post 4']);

    const secondActionTimeTravelButton = actions.nth(1).locator('button');
    await secondActionTimeTravelButton.click();

    const postTextsAfterTimeTravel = await posts.allTextContents();

    expect(postTextsAfterTimeTravel).toEqual(['Post 2', 'Post 1', 'Post 3', 'Post 4', 'Post 5']);

    const actionsAfterTimeTravel = page.locator('div > .action');
    await expect(actionsAfterTimeTravel).toHaveCount(1);

    expect(await actionsAfterTimeTravel.first().textContent()).toContain(
      'Moved post 1 from index 0 to index 1',
    );
  });

  test('should display error message when fetching fails', async ({ page }) => {
    await mockFailedFetch(page);

    await page.goto('/');
    await expect(page).toHaveTitle(/Sortable List/);

    const toastMessage = page.locator('div > .toast');
    expect(await toastMessage.textContent()).toContain('Failed to fetch posts');
  });
});
