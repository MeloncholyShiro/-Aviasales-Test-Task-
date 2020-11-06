import React from 'react';
import { TFormattedTicketList } from '../../store/Product/ProductTypes';
import { Ticket } from '../Ticket/Ticket';
import classes from './TicketList.module.scss';

interface ITicketListProps {
	dataSource?: TFormattedTicketList;
}

type TTicketList = React.FC<ITicketListProps>;

export const TicketList: TTicketList = (props: ITicketListProps) => {
	const { dataSource = [] } = props;

	console.log(dataSource);

	return (
		<ul className={classes['ticket-list']}>
			{dataSource.map(ticket => {
				return (
					<Ticket
						key={ticket.id}
						renderAs="li"
						price={ticket.price}
						logotype={ticket.logotype}
						segments={ticket.segments}
					/>
				);
			})}
		</ul>
	);
};
