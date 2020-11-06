import { DBSchema, openDB } from 'idb';
import { TTicketList } from '../../store/Product/ProductTypes';

interface ITicketsDBSchema extends DBSchema {
	sortedTickets: {
		key: string;
		value: TTicketList;
	};
}

export const InitializeStorage = async (): Promise<typeof indexedDB> => {
	const indexedDB = await openDB<ITicketsDBSchema>('Tickets', 1, {
		upgrade(dataBase) {
			dataBase.createObjectStore('sortedTickets');
		},
	});

	return indexedDB;
};

export const TicketsStorage = InitializeStorage();
