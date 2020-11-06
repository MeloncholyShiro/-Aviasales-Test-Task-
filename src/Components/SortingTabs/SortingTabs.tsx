import React from 'react';
import { SortingModes, TSortingModesValues } from '../../enums/SortingModes';
import classes from './SortingTabs.module.scss';

interface ISortingTabsProps {
	onToggle: (sortBy: TSortingModesValues) => void;
}

type TSortingTabs = React.FC<ISortingTabsProps>;

export const SortingTabs: TSortingTabs = (props: ISortingTabsProps) => {
	const { onToggle } = props;

	return (
		<nav className={classes.sorting}>
			<ul className={classes.sorting__modes}>
				<li className={classes.sorting__mode}>
					<input
						className={classes.sorting__radio}
						id="sorting-group-1"
						name="sorting-group"
						type="radio"
						defaultChecked
						onClick={() => onToggle(SortingModes.cheapest)}
					/>
					<label className={classes.sorting__button} htmlFor="sorting-group-1">
						{SortingModes.cheapest}
					</label>
				</li>
				<li className={classes.sorting__mode}>
					<input
						className={classes.sorting__radio}
						id="sorting-group-2"
						name="sorting-group"
						type="radio"
						onClick={() => onToggle(SortingModes.quickest)}
					/>
					<label className={classes.sorting__button} htmlFor="sorting-group-2">
						{SortingModes.quickest}
					</label>
				</li>
			</ul>
		</nav>
	);
};
