/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchRejectRepeater } from '.';

test('Should verify the tests are passing', () => {
	expect(false).toBe(false);
});

function mockFetch(ok: boolean, status: number, data: string) {
	return jest.fn().mockImplementation(() =>
		Promise.resolve({
			ok,
			status,
			statusText: 'Testing',
			json: () => data,
		}),
	);
}

function mockFetchRetryResolve(ok: boolean, status: number, data: string) {
	let isUsed = false;
	return jest.fn().mockImplementation(() => {
		if (isUsed) {
			return Promise.resolve({
				ok,
				status,
				statusText: isUsed,
				json: () => data,
			});
		}
		isUsed = true;
		return Promise.resolve({
			ok: false,
			status: 444,
			statusText: isUsed,
			json: () => data,
		});
	});
}

test('should return client error', async () => {
	global.fetch = mockFetch(false, 404, 'ToBeError');
	const setupTestFetch = fetchRejectRepeater('https://sup.bitch1');

	await expect(setupTestFetch({ retries: 10, retryDelay: 0 })).rejects.toThrowError(new RegExp(/(client error)/gi));
	expect(fetch).toBeCalledTimes(10);
});

test('should return server error', async () => {
	global.fetch = mockFetch(false, 500, 'ToBeError');
	const setupTestFetch = fetchRejectRepeater('https://sup.bitch2');
	await expect(setupTestFetch({ retries: 5, retryDelay: 0 })).rejects.toThrowError(new RegExp(/(server error)/gi));
	expect(fetch).toBeCalledTimes(5);
});

test('should return unexpected error', async () => {
	global.fetch = mockFetch(false, -228, 'ToBeError');
	const setupTestFetch = fetchRejectRepeater('https://sup.bitch3');
	await expect(setupTestFetch({ retries: -100, retryDelay: 0 })).rejects.toThrowError(
		new RegExp(/(unexpected error)/gi),
	);
	expect(fetch).toBeCalledTimes(1);
});

test('should return response', async () => {
	global.fetch = mockFetch(true, 228, 'SomeResponse');
	const setupTestFetch = fetchRejectRepeater('https://sup.bitch4');

	expect((await setupTestFetch({ retries: 10, retryDelay: 0 })).status).toEqual(228);
	expect((await setupTestFetch({ retries: 10, retryDelay: 0 })).json()).toEqual('SomeResponse');
	expect(fetch).toBeCalledTimes(2);
});

test('should return response after retry', async () => {
	global.fetch = mockFetchRetryResolve(true, 228, 'SomeResponse');
	const setupTestFetch = fetchRejectRepeater('https://sup.bitch4');

	expect((await setupTestFetch()).json()).toEqual('SomeResponse');
	expect((await setupTestFetch()).ok).toEqual(true);
	expect(fetch).toBeCalledTimes(3);
});
