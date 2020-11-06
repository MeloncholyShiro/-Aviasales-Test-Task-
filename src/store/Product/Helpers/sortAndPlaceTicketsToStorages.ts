import { TicketsStorage } from '../../../utils/StorageController';
import { ITicket, TTicketList } from '../ProductTypes';

type TSortCallback = (a: ITicket, b: ITicket) => number;

export const sortTicketList = (sortCallback: TSortCallback) => (ticketListToSort: TTicketList): Promise<TTicketList> =>
	new Promise<TTicketList>((resolve, reject) => {
		requestAnimationFrame(() => {
			if (ticketListToSort.length === 0) {
				const ErrorMessage = `Unexpected Error in sortTicketList. ticketListToSort.length === ${ticketListToSort.length}`;
				reject(new Error(ErrorMessage));
			}
			const sortedTicketList = [...ticketListToSort].sort(sortCallback);
			resolve(sortedTicketList);
		});
	});

export const sortTicketsByCheapest = async (ticketsToSort: TTicketList): Promise<TTicketList> => {
	const sorterFunction = sortTicketList((a, b) => a.price - b.price);
	const sortedTickets = await sorterFunction(ticketsToSort);
	return sortedTickets;
};

export const sortTicketsByQuickest = async (ticketsToSort: TTicketList): Promise<TTicketList> => {
	const sorterFunction = sortTicketList((a, b) => {
		let aDuration = 0;
		let bDuration = 0;
		a.segments.forEach(item => {
			aDuration += item.duration;
		});
		b.segments.forEach(item => {
			bDuration += item.duration;
		});

		return aDuration - bDuration;
	});
	const sortedTickets = await sorterFunction(ticketsToSort);
	return sortedTickets;
};

export const sortAndPlaceTicketsToStorages = async (ticketsToStorage: TTicketList): Promise<void> => {
	const nextByCheapest = await sortTicketsByCheapest(ticketsToStorage);
	const nextByQuickest = await sortTicketsByQuickest(ticketsToStorage);
	const ticketsStore = (await TicketsStorage).transaction('sortedTickets', 'readwrite');
	const previousByCheapest = await ticketsStore.store.get('cheapest');
	const previousByQuickest = await ticketsStore.store.get('quickest');
	if (previousByCheapest && previousByQuickest) {
		await ticketsStore.store.put([...previousByCheapest, ...nextByCheapest], 'cheapest');
		await ticketsStore.store.put([...previousByQuickest, ...nextByQuickest], 'quickest');
	} else {
		await ticketsStore.store.add(nextByCheapest, 'cheapest');
		await ticketsStore.store.add(nextByQuickest, 'quickest');
	}
	await ticketsStore.done;
};
