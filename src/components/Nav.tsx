import * as React from 'react';
import { VFC } from 'react';
import { NavLink } from 'react-router-dom';

export const Nav:VFC = () => {
	const getClassName = ({ isActive }: { isActive: boolean }): string => isActive ? "active" : "";

	return (
		<nav>
			<NavLink to='/' className={getClassName}>Pomodoro Timer</NavLink>
			<NavLink to='/settings' className={getClassName}>Settings</NavLink>
			<NavLink to='/statistics' className={getClassName}>Statistics</NavLink>
			<NavLink to='/about' className={getClassName}>About</NavLink>
		</nav>
	);
}
