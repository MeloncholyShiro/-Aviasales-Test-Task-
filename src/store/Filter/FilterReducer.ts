import { FilterModes } from '../../enums/FilterModes';
import { FilterActionTypes, IFilterState, TFilterActions } from './FilterTypes';

const initialState: IFilterState = {
	selectedFilters: new Set([FilterModes.NoTransfer, FilterModes.OneTransfer, FilterModes.TwoTransfers]),
};

export const filterReducer = (state = initialState, action: TFilterActions): IFilterState => {
	switch (action.type) {
		case FilterActionTypes.CHANGE_MODE_REQUEST:
			return state;
		case FilterActionTypes.CHANGE_MODE_DONE:
			return { ...state, selectedFilters: action.payload };
		case FilterActionTypes.FILTER_TICKETS_REQUEST:
			return state;
		case FilterActionTypes.FILTER_TICKETS_DONE:
			return state;
		default:
			return state;
	}
};
