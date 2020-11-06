import { FilterModes, TFilterModesKeys } from '../../enums/FilterModes';
import { appendTicketList } from '../Product/ProductActions';
import { AppThunk } from '../rootReducer';
import { FilterActionTypes } from './FilterTypes';

export const selectFilter = (newFilter: TFilterModesKeys): AppThunk => (dispatch, getState) => {
	dispatch({ type: FilterActionTypes.CHANGE_MODE_REQUEST });

	const { selectedFilters } = getState().filter;

	const updatedFilters = new Set([...selectedFilters]);

	const filterModeAllGenerate = () => {
		if (updatedFilters.has(FilterModes[newFilter])) {
			updatedFilters.clear();
		} else {
			Object.values(FilterModes).map(filterMode => updatedFilters.add(filterMode));
		}
	};

	const filterModeOneGenerate = () => {
		if (updatedFilters.has(FilterModes[newFilter])) {
			updatedFilters.delete(FilterModes[newFilter]);
		} else {
			updatedFilters.add(FilterModes[newFilter]);
		}
	};

	if (FilterModes[newFilter] === FilterModes.All) {
		filterModeAllGenerate();
	} else {
		filterModeOneGenerate();
	}

	dispatch({ type: FilterActionTypes.CHANGE_MODE_DONE, payload: updatedFilters });
	dispatch(appendTicketList());
};
