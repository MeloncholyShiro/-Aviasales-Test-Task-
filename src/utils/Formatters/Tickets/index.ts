import { add, format } from 'date-fns';

export const getFormattedNumberInRub = (numberInRubles: number): string => {
	const formattedNumber = new Intl.NumberFormat('ru-RU').format(numberInRubles);
	const rubblesIdentifier = 'Р';
	return `${formattedNumber} ${rubblesIdentifier}`;
};

export const getFormattedRoute = (routeFrom: string, routeTo: string): string => `${routeFrom} - ${routeTo}`;

export const getFormattedRouteTime = (routeTimeFrom: string | Date, durationInMinutes: number): string => {
	const initialTime = new Date(routeTimeFrom);
	const routeTimeStart = format(initialTime, 'hh:mm');
	const routeTimeEnd = format(add(initialTime, { minutes: durationInMinutes }), 'hh:mm');
	return `${routeTimeStart} - ${routeTimeEnd}`;
};

export const getFormattedDurationTime = (durationInMinutes: number): string => {
	const hours = Math.trunc(durationInMinutes / 60);
	const minutes = durationInMinutes % 60;
	return `${hours}ч ${minutes}м`;
};

export const getFormattedStops = (stopsList: string[]): string => stopsList.join(', ');

export const getFormattedStopsCount = (stopListLength: number): string => {
	if (stopListLength === 0) {
		return 'Без пересадок';
	}
	if (stopListLength === 1) {
		return `${stopListLength} пересадка`;
	}
	if (stopListLength < 5) {
		return `${stopListLength} пересадки`;
	}
	return `${stopListLength} пересадок`;
};

export const getAirLineLogoLink = (IATA_CODE: string): string => `https://pics.avs.io/99/36/${IATA_CODE}.png`;
