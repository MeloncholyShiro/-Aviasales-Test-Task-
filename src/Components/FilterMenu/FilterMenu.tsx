import React from 'react';
import { TOnFilterSelect, TSelectedFilters } from '../../Containers/FilterContainer/FilterContainerTypes';
import { FilterModes, TFilterModesKeys } from '../../enums/FilterModes';
import { Checkbox } from '../Checkbox';
import classes from './FilterMenu.module.scss';

interface IFilterMenuProps {
	readonly selectedFilters: TSelectedFilters;
	readonly onFilterSelect: TOnFilterSelect;
}

type TFilterMenu = React.FC<IFilterMenuProps>;

export const FilterMenu: TFilterMenu = (props: IFilterMenuProps) => {
	const { selectedFilters, onFilterSelect } = props;
	return (
		<div className={classes['filter-menu']}>
			<h3 className={classes['filter-menu__title']}>Количество пересадок</h3>
			<ul className={classes['filter-menu__list']}>
				{Object.entries(FilterModes).map(([key, value]) => {
					const keyForFilter = `Filter__${key}`;
					return (
						<Checkbox
							uniqueID={keyForFilter}
							onCheck={() => onFilterSelect(key as TFilterModesKeys)}
							key={keyForFilter}
							checked={selectedFilters.has(value)}
							title={value}
						/>
					);
				})}
			</ul>
		</div>
	);
};
