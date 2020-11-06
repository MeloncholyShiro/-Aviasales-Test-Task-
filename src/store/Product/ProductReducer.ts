import { SortingModes } from '../../enums/SortingModes';
import { IProductState, ProductActionTypes, TProductActions } from './ProductTypes';

const initialState: IProductState = {
	tickets: [],
	isFetchEnded: false,
	sortingMode: SortingModes.cheapest,
};

export const productReducer = (state = initialState, action: TProductActions): IProductState => {
	switch (action.type) {
		case ProductActionTypes.FETCH_TICKETS_REQUEST:
			return state;
		case ProductActionTypes.FETCH_TICKETS_DONE:
			return { ...state, isFetchEnded: action.payload };
		case ProductActionTypes.FETCH_TICKETS_ERROR:
			// TODO: Error Handler
			// eslint-disable-next-line no-console
			console.warn(action.payload);
			return state;
		case ProductActionTypes.APPEND_TICKETS_REQUEST:
			return state;
		case ProductActionTypes.APPEND_TICKETS_DONE:
			return { ...state, tickets: action.payload };
		case ProductActionTypes.SORT_REQUEST:
			return state;
		case ProductActionTypes.SORT_DONE:
			return { ...state, sortingMode: action.payload };
		default:
			return state;
	}
};
