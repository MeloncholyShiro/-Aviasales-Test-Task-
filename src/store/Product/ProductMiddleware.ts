/* eslint-disable unicorn/consistent-function-scoping */
import { Middleware } from 'redux';
import * as Formatters from '../../utils/Formatters/Tickets';
import { RootState } from '../rootReducer';
import { ProductActionTypes, TFormattedTicketList, TProductActions, TTicketList } from './ProductTypes';

const FORMAT_TICKETS_REQUEST = 'FORMAT/TICKETS_REQUEST';
const FORMAT_TICKETS_DONE = 'FORMAT/TICKETS_DONE';

// TODO: Переписать это дерьмище

export const formatTicketsMiddleware: Middleware<TProductActions, RootState> = store => next => (
	action: TProductActions,
) => {
	if (action.type === ProductActionTypes.APPEND_TICKETS_DONE) {
		store.dispatch({ type: FORMAT_TICKETS_REQUEST });
		const ticketList = (action.payload as unknown) as TTicketList;
		const formattedTicketList: TFormattedTicketList = ticketList.map(ticket => {
			const { id, price, carrier, segments } = ticket;
			const airlineLogotype = Formatters.getAirLineLogoLink(carrier);
			const priceInRubbles = Formatters.getFormattedNumberInRub(price);
			const formattedSegments = segments.map(segment => {
				const { origin, destination, date, duration, stops } = segment;
				const formattedRoute = Formatters.getFormattedRoute(origin, destination);
				const formattedRouteTime = Formatters.getFormattedRouteTime(date, duration);
				const formattedDurationTime = Formatters.getFormattedDurationTime(duration);
				const formattedStopsCount = Formatters.getFormattedStopsCount(stops.length);
				const formattedStops = Formatters.getFormattedStops(stops);
				return {
					dateAsKey: date,
					route: formattedRoute,
					routeTime: formattedRouteTime,
					duration: formattedDurationTime,
					stops: formattedStops,
					stopsCount: formattedStopsCount,
				};
			});
			return {
				id,
				logotype: airlineLogotype,
				price: priceInRubbles,
				segments: formattedSegments,
			};
		});
		store.dispatch({ type: FORMAT_TICKETS_DONE });
		return next({ type: action.type, payload: formattedTicketList });
	}
	return next(action);
};
