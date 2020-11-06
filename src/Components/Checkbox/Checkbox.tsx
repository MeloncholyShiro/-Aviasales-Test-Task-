import React from 'react';
import classes from './Checkbox.module.scss';

interface ICheckboxProps {
	uniqueName?: string;
	uniqueID: string;
	title?: string;
	checked?: boolean;
	onCheck?: (event: React.ChangeEvent) => void;
	defaultChecked?: boolean;
	renderAs?: 'div' | 'li';
}

type TCheckbox = React.FC<ICheckboxProps>;

export const Checkbox: TCheckbox = (props: ICheckboxProps) => {
	const { renderAs: ParentTag = 'li', uniqueID, uniqueName, title = '', onCheck, defaultChecked, checked } = props;

	return (
		<ParentTag className={classes.checkbox}>
			<input
				className={classes.checkbox__input}
				type="checkbox"
				onChange={onCheck}
				name={uniqueName}
				id={uniqueID}
				checked={checked}
				defaultChecked={defaultChecked}
			/>
			<label className={classes.checkbox__label} htmlFor={uniqueID}>
				{title}
			</label>
		</ParentTag>
	);
};
