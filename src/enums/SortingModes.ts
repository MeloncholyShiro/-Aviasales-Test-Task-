export const SortingModes = {
	quickest: 'Самый быстрый',
	cheapest: 'Самый дешёвый',
} as const;

export const SortingModesValueAssociations = {
	[SortingModes.quickest]: 'quickest',
	[SortingModes.cheapest]: 'cheapest',
} as const;

export type TSortingModesKeys = keyof typeof SortingModes;

export type TSortingModesValues = typeof SortingModes[TSortingModesKeys];
