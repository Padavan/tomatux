import * as React from 'react';
import { VFC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const Nav:VFC = () => {
	const getClassName = ({ isActive }: NavLinkProps) => isActive ? "active" : "";

	return (
		<nav>
			<h1>Pomodoro Timer</h1>
			<NavLink to='/' className={getClassName}>Timer</NavLink>
			<NavLink to='/settings' className={getClassName}>Settings</NavLink>
			<NavLink to='/statistics' className={getClassName}>Statistics</NavLink>
			<NavLink to='/about' className={getClassName}>About</NavLink>
		</nav>
	);
}
