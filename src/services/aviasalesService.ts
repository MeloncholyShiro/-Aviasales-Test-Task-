import { fetchRejectRepeater } from '../utils/RejectRepeater';
import { GET_SEARCH_ID_URL, GET_TICKETS_URL } from './URL_LIST';

export interface ISearchIdResponse {
	readonly searchId: string;
}

export const getSearchId = async (): Promise<ISearchIdResponse> => {
	const URL = GET_SEARCH_ID_URL.href;
	const response = await fetchRejectRepeater(URL)();
	return response.json() as Promise<ISearchIdResponse>;
};

export interface ITicketResponse {
	readonly price: number;
	readonly carrier: string;
	readonly segments: {
		readonly origin: string;
		readonly destination: string;
		readonly date: string;
		readonly stops: string[];
		readonly duration: number;
	}[];
}

export interface ITicketListResponse {
	readonly tickets: ITicketResponse[];
	readonly stop: boolean;
}

export const getTicketList = async (): Promise<ITicketListResponse> => {
	const URL = GET_TICKETS_URL.href;
	const response = await fetchRejectRepeater(URL)();
	return response.json() as Promise<ITicketListResponse>;
};
