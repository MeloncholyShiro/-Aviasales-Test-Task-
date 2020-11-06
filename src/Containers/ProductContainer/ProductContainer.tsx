import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../Components/Product';
import { TSortingModesValues } from '../../enums/SortingModes';
import { fetchTickets, setSortingMode } from '../../store/Product/ProductActions';
import { RootState } from '../../store/rootReducer';

export const ProductContainer: React.FC = () => {
	const productDispatch = useDispatch();
	const { tickets, sortingMode } = useSelector((state: RootState) => state.product);
	const { isEnvironmentReady } = useSelector((state: RootState) => state.application);

	const onSortingHandler = (sortBy: TSortingModesValues) => {
		if (sortingMode !== sortBy) {
			productDispatch(setSortingMode(sortBy));
		}
	};

	useEffect(() => {
		if (isEnvironmentReady) {
			productDispatch(fetchTickets());
		}
	}, [isEnvironmentReady, productDispatch]);

	return <Product ticketList={tickets} onSorting={onSortingHandler} />;
};
