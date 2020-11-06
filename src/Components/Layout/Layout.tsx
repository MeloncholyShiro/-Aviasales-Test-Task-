import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Logotype } from '../Logotype';
import classes from './Layout.module.scss';

interface ILayoutProps {
	children?: React.ReactNode;
}

type TLayout = React.FC<ILayoutProps>;

export const Layout: TLayout = ({ children }: ILayoutProps) => {
	return (
		<>
			<LoadingBar
				className={classes.loading}
				showFastActions
				updateTime={100}
				maxProgress={95}
				progressIncrease={10}
			/>
			<header className={classes.header}>
				<Logotype />
			</header>
			<main className={classes.main}>{children}</main>
		</>
	);
};
