import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from '../../Components/Filter';
import { FilterModes } from '../../enums/FilterModes';
import { selectFilter } from '../../store/Filter/FilterActions';
import { RootState } from '../../store/rootReducer';
import { TOnFilterSelect } from './FilterContainerTypes';

export const FilterContainer: React.FC = () => {
	const filterDispatch = useDispatch();
	const { selectedFilters } = useSelector((state: RootState) => state.filter);

	const onFilterSelectedHandler: TOnFilterSelect = selectedFilterKey => {
		filterDispatch(selectFilter(selectedFilterKey));
	};

	const onResetFilter = () => {
		if (selectedFilters.has(FilterModes.All)) {
			filterDispatch(selectFilter('All'));
		} else {
			filterDispatch(selectFilter('All'));
			filterDispatch(selectFilter('All'));
		}
	};

	return (
		<Filter
			selectedFilters={selectedFilters}
			onFilterReset={onResetFilter}
			onFilterSelect={onFilterSelectedHandler}
		/>
	);
};
