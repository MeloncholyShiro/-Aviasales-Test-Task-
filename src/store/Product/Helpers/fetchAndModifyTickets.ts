import { nanoid } from 'nanoid';
import { getTicketList, ITicketResponse } from '../../../services/aviasalesService';
import { ITicket, TTicketList } from '../ProductTypes';

type TModifiedTicketList = ITicket[] | never[];

export const modifyTicketList = (ticketListToModify: ITicketResponse[]): Promise<TTicketList> =>
	new Promise<TTicketList>((resolve, reject) => {
		requestAnimationFrame(() => {
			if (ticketListToModify.length === 0) {
				const ErrorMessage = `Unexpected Error in modifyTicketList. ticketListToModify.length === ${ticketListToModify.length}`;
				reject(new Error(ErrorMessage));
			}
			const modifiedTicketList: TModifiedTicketList = new Array(ticketListToModify.length);
			const iterableTickets: IterableIterator<[number, ITicketResponse]> = ticketListToModify.entries();
			for (const [index, ticket] of iterableTickets) {
				const modifiedTicket: ITicket = { id: nanoid(), ...ticket };
				modifiedTicketList[index] = modifiedTicket;
			}
			resolve(modifiedTicketList);
		});
	});

export const fetchAndModifyTickets = async (parts = Infinity, fetchTimeout = 0): Promise<[TTicketList, boolean]> => {
	const ModifiedTicketList: TTicketList[] = [];

	const makeRequestAndModifyResponse = async (partsLeft: number) => {
		const { tickets, stop } = await getTicketList();
		const modifiedTickets = await modifyTicketList(tickets);
		ModifiedTicketList.push(modifiedTickets);
		if (partsLeft > 1 && !stop) {
			if (fetchTimeout > 0) {
				const sleep = new Promise(resolve => setTimeout(resolve, fetchTimeout));
				await sleep;
			}
			await makeRequestAndModifyResponse(partsLeft - 1);
		}
		return stop;
	};

	const isStopped = await makeRequestAndModifyResponse(parts);

	const result: TTicketList = ModifiedTicketList.flat(1);

	return [result, isStopped];
};
