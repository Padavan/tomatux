import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function Nav() {
	/***
	 * @param {boolean} isActive
	 * @returns {string}
	 **/
	const getClassName = (isActive) => isActive ? "active" : "";

	return (
		<nav>
			<NavLink exact to='/' className={getClassName}>Pomodoro</NavLink>
			<NavLink to='/settings' className={getClassName}>Settings</NavLink>
			<NavLink to='/statistics' className={getClassName}>Statistics</NavLink>
		</nav>
	);
}
