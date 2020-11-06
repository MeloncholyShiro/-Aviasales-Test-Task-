import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setupEnvironment } from '../../store/Application/ApplicationActions';
import { fetchTickets } from '../../store/Product/ProductActions';
import { RootState } from '../../store/rootReducer';
import { FilterContainer as Filter } from '../FilterContainer';
import { ProductContainer as Product } from '../ProductContainer';
import { Layout } from '../../Components/Layout';
import './RootStyles/index.scss';

export const ApplicationContainer: React.FC = () => {
	const applicationDispatch = useDispatch();
	const { isEnvironmentReady } = useSelector((state: RootState) => state.application);

	useEffect(() => {
		applicationDispatch(setupEnvironment());
	}, [applicationDispatch]);

	useEffect(() => {
		if (isEnvironmentReady) {
			applicationDispatch(fetchTickets(1));
		}
	}, [applicationDispatch, isEnvironmentReady]);
	return (
		<Layout>
			<Filter />
			<Product />
		</Layout>
	);
};
