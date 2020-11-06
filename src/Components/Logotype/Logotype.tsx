import React from 'react';
import { Link } from 'react-router-dom';
import logotype from './images/logotype.svg';
import classes from './Logotype.module.scss';

export const Logotype: React.FC = () => (
	<Link to="/">
		<img className={classes.logotype} src={logotype} alt="Aviasales Logotype" />
	</Link>
);
