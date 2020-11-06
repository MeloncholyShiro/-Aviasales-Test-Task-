import { SortingModesValueAssociations, TSortingModesValues } from '../../enums/SortingModes';
import { TicketsStorage } from '../../utils/StorageController';
import { appendFiltersOnTicketList } from '../Filter/Helpers/appendFilters';
import { AppThunk } from '../rootReducer';
import { fetchAndModifyTickets } from './Helpers/fetchAndModifyTickets';
import { sortAndPlaceTicketsToStorages } from './Helpers/sortAndPlaceTicketsToStorages';
import { ProductActionTypes } from './ProductTypes';

export const appendTicketList = (maxTicketsToAppend = 5): AppThunk => {
	return async (dispatch, getState) => {
		const { sortingMode } = getState().product;
		const { selectedFilters } = getState().filter;
		dispatch({ type: ProductActionTypes.APPEND_TICKETS_REQUEST });
		const ticketsStore = (await TicketsStorage).transaction('sortedTickets', 'readonly');
		const sortedTickets = await ticketsStore.store.get(SortingModesValueAssociations[sortingMode]);
		await ticketsStore.done;
		if (sortedTickets) {
			const ticketListWithFilters = appendFiltersOnTicketList(sortedTickets, selectedFilters);
			const cattedTicketListToMaxAppend = ticketListWithFilters.slice(0, maxTicketsToAppend);
			dispatch({ type: ProductActionTypes.APPEND_TICKETS_DONE, payload: cattedTicketListToMaxAppend });
		}
	};
};

export function setSortingMode(newSortingMode: TSortingModesValues): AppThunk {
	return (dispatch, getState) => {
		dispatch({ type: ProductActionTypes.SORT_REQUEST });
		const { sortingMode } = getState().product;
		if (sortingMode !== newSortingMode) {
			dispatch({ type: ProductActionTypes.SORT_DONE, payload: newSortingMode });
			dispatch(appendTicketList());
		}
		// TODO: ErrorHandle
	};
}

export function fetchTickets(parts?: number, fetchTimeout?: number): AppThunk {
	return async (dispatch, getState) => {
		const { isFetchEnded } = getState().product;
		const { isEnvironmentReady } = getState().application;
		if (isFetchEnded || !isEnvironmentReady) return;
		dispatch({ type: ProductActionTypes.FETCH_TICKETS_REQUEST });
		try {
			const [tickets, stop] = await fetchAndModifyTickets(parts, fetchTimeout);
			await sortAndPlaceTicketsToStorages(tickets);
			dispatch({ type: ProductActionTypes.FETCH_TICKETS_DONE, payload: stop });
			dispatch(appendTicketList());
		} catch (error) {
			if (error instanceof Error) {
				dispatch({ type: ProductActionTypes.FETCH_TICKETS_ERROR, payload: error });
			}
		}
	};
}
