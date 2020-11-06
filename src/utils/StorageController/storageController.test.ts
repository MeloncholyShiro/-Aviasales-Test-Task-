import 'fake-indexeddb/auto';
import { TicketsStorage } from '.';

test('Should verify the tests are passing', () => {
	expect(false).toBe(false);
});

test('should create store named sortedTickets', async () => {
	const testingStuff = await TicketsStorage;
	const testTransition = testingStuff.transaction('sortedTickets', 'readwrite');
	const isStoreCreated = testTransition.store.name;

	expect(isStoreCreated).toBe('sortedTickets');
});
