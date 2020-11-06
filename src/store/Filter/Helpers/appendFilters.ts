import { FilterModesValueAssociations, TFilterModesValues } from '../../../enums/FilterModes';
import { TTicketList } from '../../Product/ProductTypes';

type TAppendFilters = (ticketList: TTicketList, filtersToAppend: Set<TFilterModesValues>) => TTicketList;

export const appendFiltersOnTicketList: TAppendFilters = (ticketList, filtersToAppend) => {
	const makeAssociate = [...filtersToAppend.values()].map(item => FilterModesValueAssociations[item]);
	// TODO: RequestAnimationFrame
	const appendFilters = ticketList.filter(ticket =>
		ticket.segments.every(item => makeAssociate.some(someLength => item.stops.length === someLength)),
	);
	return appendFilters;
};
