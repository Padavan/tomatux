import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.styles.css';

/***
 * @param {boolean} isActive
 * @returns {string}
 **/
const getClassName = (isActive) => isActive ? "active" : "";

export function Nav() {
	return (
		<nav>
			<NavLink exact to='/' className={getClassName}>Pomodoro</NavLink>
			<NavLink to='/settings' className={getClassName}>Settings</NavLink>
			<NavLink to='/statistics' className={getClassName}>Statistics</NavLink>
		</nav>
	);
}
