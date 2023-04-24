import got from 'got';

options = {
    headers: {
        "Base-Url": "https://    ",
        'user-agent': 'my-app/0.0.1',
        Authorization: 'Bearer ' + token,
        'X-JMS-ORG': '00000000-0000-0000-0000-000000000002',
    },
    json: true,
    responseType: 'json',
};

export const jumpserver_client = got.extend(options);

// Path: src/jumpserver.js
export async function register(user) {
    return jumpserver_client.post('api/v1/users/', {
        json: user,
    });
}

export async function register(username) {
