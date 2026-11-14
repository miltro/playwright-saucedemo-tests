const { test, expect } = require('@playwright/test');

test('GET a single user returns correct data', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Leanne Graham');
    expect(body.address.city).toBe('Gwenborough');
});

test('GET a non-existent user returns 404', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/999');

    expect(response.status()).toBe(404);
});

test('POST creates a new post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'My first post',
            body: 'Post content',
            userId: 1,
        },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('My first post');
});

test('PUT updates the post title', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            id: 1,
            title: 'Updated title',
            body: 'New content',
            userId: 1,
        },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated title');
});

test('DELETE removes a post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    // JSONPlaceholder is a fake API and does not really delete data, so GET still returns 200.
    // On a real API we would verify that the post is gone:
    // const getResponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    // expect(getResponse.status()).toBe(404);
});

test('GET the user list returns 10 users', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveLength(10);
    expect(body[0].name).toBe('Leanne Graham');
});

test('every user has an email containing @', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    const body = await response.json();
    for (const user of body) {
        expect(user.email).toContain('@');
    }
});
