import { TSortingModesValues } from '../../enums/SortingModes';

const FETCH_TICKETS_REQUEST = 'PRODUCT/FETCH_REQUEST' as const;
const FETCH_TICKETS_DONE = 'PRODUCT/FETCH_DONE' as const;
const FETCH_TICKETS_ERROR = 'PRODUCT/FETCH_ERROR' as const;

const SORT_REQUEST = 'PRODUCT/SORT_REQUEST' as const;
const SORT_DONE = 'PRODUCT/SORT_DONE' as const;
const SORT_ERROR = 'PRODUCT/SORT_ERROR' as const;

const APPEND_TICKETS_REQUEST = 'PRODUCT/APPEND_REQUEST' as const;
const APPEND_TICKETS_DONE = 'PRODUCT/APPEND_DONE' as const;
const APPEND_TICKETS_ERROR = 'PRODUCT/APPEND_ERROR' as const;

export const ProductActionTypes = {
	FETCH_TICKETS_REQUEST,
	FETCH_TICKETS_DONE,
	FETCH_TICKETS_ERROR,
	APPEND_TICKETS_REQUEST,
	APPEND_TICKETS_DONE,
	APPEND_TICKETS_ERROR,
	SORT_REQUEST,
	SORT_DONE,
	SORT_ERROR,
} as const;

export interface ITicket {
	readonly id: string;
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

export type TTicketList = readonly ITicket[];

// Added by Middleware

export interface IFormattedTicket {
	readonly id: string;
	readonly logotype: string;
	readonly price: string;
	readonly segments: {
		readonly dateAsKey: string;
		readonly route: string;
		readonly routeTime: string;
		readonly duration: string;
		readonly stops: string;
		readonly stopsCount: string;
	}[];
}

export type TFormattedTicketList = readonly IFormattedTicket[];

// ^ Added by Middleware

export interface IProductState {
	readonly tickets: TFormattedTicketList;
	readonly isFetchEnded: boolean;
	readonly sortingMode: TSortingModesValues;
}

interface IFetchTicketsRequestAction {
	readonly type: typeof FETCH_TICKETS_REQUEST;
}

interface IFetchTicketsDoneAction {
	readonly type: typeof FETCH_TICKETS_DONE;
	readonly payload: boolean;
}

interface IFetchTicketsErrorAction {
	readonly type: typeof FETCH_TICKETS_ERROR;
	readonly payload: Error;
}

interface IAppendTicketsRequestAction {
	readonly type: typeof APPEND_TICKETS_REQUEST;
}

interface IAppendTicketsDoneAction {
	readonly type: typeof APPEND_TICKETS_DONE;
	readonly payload: TFormattedTicketList;
}

interface ISortRequestAction {
	readonly type: typeof SORT_REQUEST;
}

interface ISortRequestDone {
	readonly type: typeof SORT_DONE;
	readonly payload: TSortingModesValues;
}

export type TProductActions =
	| IFetchTicketsRequestAction
	| IFetchTicketsDoneAction
	| IFetchTicketsErrorAction
	| IAppendTicketsRequestAction
	| IAppendTicketsDoneAction
	| ISortRequestAction
	| ISortRequestDone;
