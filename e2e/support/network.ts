export async function mockSuccessfulFetch(page) {
  await page.route('https://jsonplaceholder.typicode.com/posts', (route) =>
    route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' },
        { id: 4, title: 'Post 4' },
        { id: 5, title: 'Post 5' },
        { id: 6, title: 'Post 6' },
        { id: 7, title: 'Post 7' },
        { id: 8, title: 'Post 8' },
        { id: 9, title: 'Post 9' },
      ]),
    }),
  );
}

export async function mockFailedFetch(page) {
  await page.route('https://jsonplaceholder.typicode.com/posts', (route) => {
    route.abort('failed');
  });
}
