import { TFilterModesKeys, TFilterModesValues } from '../../enums/FilterModes';

export type TOnFilterSelect = (selectedFilterKey: TFilterModesKeys) => void;

export type TSelectedFilters = Set<TFilterModesValues>;
