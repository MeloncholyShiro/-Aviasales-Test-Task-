import { TFilterModesValues } from '../../enums/FilterModes';

const CHANGE_MODE_REQUEST = 'FILTER/CHANGE_REQUEST' as const;
const CHANGE_MODE_DONE = 'FILTER/CHANGE_DONE' as const;
const CHANGE_MODE_ERROR = 'FILTER/CHANGE_ERROR' as const;

const FILTER_TICKETS_REQUEST = 'FILTER/TICKETS_REQUEST' as const;
const FILTER_TICKETS_DONE = 'FILTER/TICKETS_DONE' as const;
const FILTER_TICKETS_ERROR = 'FILTER/TICKETS_ERROR' as const;

export const FilterActionTypes = {
	CHANGE_MODE_REQUEST,
	CHANGE_MODE_DONE,
	CHANGE_MODE_ERROR,
	FILTER_TICKETS_REQUEST,
	FILTER_TICKETS_DONE,
	FILTER_TICKETS_ERROR,
} as const;

export interface IFilterState {
	readonly selectedFilters: Set<TFilterModesValues>;
}

interface IChangeModeRequest {
	readonly type: typeof CHANGE_MODE_REQUEST;
}

interface IChangeModeDone {
	readonly type: typeof CHANGE_MODE_DONE;
	readonly payload: Set<TFilterModesValues>;
}

interface IFilterTicketsRequest {
	readonly type: typeof FILTER_TICKETS_REQUEST;
}

interface IFilterTicketsDone {
	readonly type: typeof FILTER_TICKETS_DONE;
}

export type TFilterActions = IChangeModeRequest | IChangeModeDone | IFilterTicketsRequest | IFilterTicketsDone;
