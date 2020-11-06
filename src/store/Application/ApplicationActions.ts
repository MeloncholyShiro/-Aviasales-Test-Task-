import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSearchId } from '../../services/aviasalesService';
import { GET_TICKETS_URL, TICKETS_SEARCH_QUERY } from '../../services/URL_LIST';
import { TicketsStorage } from '../../utils/StorageController';
import { ApplicationActionTypes } from './ApplicationTypes';
import { RootState } from '../rootReducer';

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export function setupEnvironment(): AppThunk {
	return async dispatch => {
		// FIXME:;
		const ticketsStore = (await TicketsStorage).transaction('sortedTickets', 'readwrite');
		await ticketsStore.store.clear();
		await ticketsStore.done;
		// FIXME:;

		dispatch({ type: ApplicationActionTypes.SETUP_ENVIRONMENT_REQUEST });
		const { searchId } = await getSearchId();
		if (searchId.trim().length > 0) {
			GET_TICKETS_URL.searchParams.set(TICKETS_SEARCH_QUERY, searchId);
			dispatch({
				type: ApplicationActionTypes.SETUP_ENVIRONMENT_DONE,
				payload: searchId,
				isEnvironmentReady: true,
			});
		}
		// TODO: Добавить Action ошибки если прилетела пустая строка
	};
}
