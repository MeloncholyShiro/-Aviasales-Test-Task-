export const FilterModes = {
	All: 'Все',
	NoTransfer: 'Без пересадок',
	OneTransfer: '1 пересадка',
	TwoTransfers: '2 пересадки',
	ThreeTransfers: '3 пересадки',
} as const;

export const FilterModesValueAssociations = {
	[FilterModes.All]: Number.NaN,
	[FilterModes.NoTransfer]: 0,
	[FilterModes.OneTransfer]: 1,
	[FilterModes.TwoTransfers]: 2,
	[FilterModes.ThreeTransfers]: 3,
} as const;

export type TFilterModesKeys = keyof typeof FilterModes;

export type TFilterModesValues = typeof FilterModes[TFilterModesKeys];
