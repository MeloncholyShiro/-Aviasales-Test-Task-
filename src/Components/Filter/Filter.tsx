import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { TOnFilterSelect, TSelectedFilters } from '../../Containers/FilterContainer/FilterContainerTypes';
import { useBreakpointDown } from '../../utils/Hooks/useBreakpoint';
import { FilterMenu } from '../FilterMenu';
import classes from './Filter.module.scss';

interface IFilterMobileWrapper {
	readonly children: React.ReactNode;
	readonly onFilterReset: React.MouseEventHandler;
	readonly onClose: React.MouseEventHandler;
	readonly isVisible: boolean;
}

type TFilterMobileWrapper = React.FC<IFilterMobileWrapper>;

const FilterMobileWrapper: TFilterMobileWrapper = ({
	isVisible,
	onFilterReset,
	onClose,
	children,
}: IFilterMobileWrapper) => {
	// Типизацию не завезли...
	const FilterMobileAnimation = useSpring({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		from: { opacity: 0, transform: 'translateY(100%)', display: 'none' },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		to: async (next: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			await next(isVisible && { display: 'flex' });
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			await next({ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(100%)' });
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			await next(isVisible || { display: 'none' });
		},
	});

	return (
		<animated.div style={FilterMobileAnimation} className={classes.filter__body}>
			<ul className={classes['filter__mobile-header-list']}>
				<li className={classes['filter__mobile-header-item']}>
					<button className={classes['filter__mobile-reset']} type="button" onClick={onFilterReset}>
						Сбросить фильтры
					</button>
				</li>
				<li className={classes['filter__mobile-header-item']}>
					<button className={classes['filter__mobile-close']} type="button" onClick={onClose}>
						&times;
					</button>
				</li>
			</ul>
			{children}
		</animated.div>
	);
};

interface IFilterMobileButton {
	readonly onClick: React.MouseEventHandler;
	readonly shouldRender: boolean;
}

type TFilterMobileButton = React.FC<IFilterMobileButton>;

const FilterMobileButton: TFilterMobileButton = ({ onClick, shouldRender }: IFilterMobileButton) =>
	shouldRender ? (
		<button type="button" className={classes.filter__button} onClick={onClick}>
			Фильтры
		</button>
	) : null;

interface IFilterProps {
	readonly selectedFilters: TSelectedFilters;
	readonly onFilterReset: React.MouseEventHandler;
	readonly onFilterSelect: TOnFilterSelect;
}

type TFilter = React.FC<IFilterProps>;

export const Filter: TFilter = (props: IFilterProps) => {
	const { selectedFilters, onFilterReset, onFilterSelect } = props;
	const isMobile = useBreakpointDown(796);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const shouldButtonRender = isMobile && !isMobileMenuOpen;

	const onCloseHandler = () => setIsMobileMenuOpen(false);

	const onOpenHandler = () => setIsMobileMenuOpen(true);

	if (isMobile) {
		return (
			<section className={classes.filter}>
				<FilterMobileWrapper
					onClose={onCloseHandler}
					onFilterReset={onFilterReset}
					isVisible={isMobileMenuOpen}
				>
					<FilterMenu selectedFilters={selectedFilters} onFilterSelect={onFilterSelect} />
				</FilterMobileWrapper>
				<FilterMobileButton shouldRender={shouldButtonRender} onClick={onOpenHandler} />
			</section>
		);
	}

	return (
		<section>
			<FilterMenu selectedFilters={selectedFilters} onFilterSelect={onFilterSelect} />
		</section>
	);
};
