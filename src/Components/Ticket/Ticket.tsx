import React from 'react';
import { IFormattedTicket } from '../../store/Product/ProductTypes';

import classes from './Ticket.module.scss';

interface ITicketProps extends Omit<IFormattedTicket, 'id'> {
	renderAs?: 'div' | 'li';
}

type TTicket = React.FC<ITicketProps>;

export const Ticket: TTicket = (props: ITicketProps) => {
	const { renderAs: ParentTag = 'div', price, logotype, segments } = props;

	return (
		<ParentTag className={classes.ticket}>
			<div className={classes.ticket__header}>
				<span className={classes.ticket__price} aria-label="Стоимость билетов">
					{price}
				</span>
				<div className={classes.ticket__logotype}>
					<img src={logotype} alt="Логотип Авиакомпании" />
				</div>
			</div>
			{segments.map(segment => {
				const { dateAsKey, route, duration, routeTime, stops, stopsCount } = segment;

				return (
					<div className={classes.ticket__body} key={dateAsKey}>
						<div className={classes.ticket__info}>
							<span className={classes.ticket__cell} aria-label="Маршрут">
								{route}
							</span>
							<span className={classes.ticket__data} aria-label="Время вылета и время посадки">
								{routeTime}
							</span>
						</div>
						<div className={classes.ticket__info}>
							<span className={classes.ticket__cell}>В пути</span>
							<span className={classes.ticket__data} aria-label="Время полёта">
								{duration}
							</span>
						</div>
						<div className={classes.ticket__info}>
							<span className={classes.ticket__cell}>{stopsCount}</span>
							<span className={classes.ticket__data}>{stops}</span>
						</div>
					</div>
				);
			})}
		</ParentTag>
	);
};
