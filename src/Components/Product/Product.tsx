import React from 'react';
import { TSortingModesValues } from '../../enums/SortingModes';
import { TFormattedTicketList } from '../../store/Product/ProductTypes';
import { SortingTabs } from '../SortingTabs';
import { TicketList } from '../TicketList';
import classes from './Product.module.scss';

interface IProductProps {
	ticketList: TFormattedTicketList;
	onSorting: (sortBy: TSortingModesValues) => void;
}
type TProduct = React.FC<IProductProps>;

export const Product: TProduct = (props: IProductProps) => {
	const { onSorting, ticketList } = props;

	return (
		<section className={classes.product}>
			<SortingTabs onToggle={onSorting} />
			<TicketList dataSource={ticketList} />
		</section>
	);
};
