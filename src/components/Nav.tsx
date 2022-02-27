import * as React from 'react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Nav:FC = () => (
	<nav>
		<h1>Pomodoro Timer</h1>
		<NavLink to='/' exact className='navLink' activeClassName="active">Timer</NavLink>
		<NavLink to='/settings' className="navLink" activeClassName="active">Settings</NavLink>
		<NavLink to='/statistics' className="navLink" activeClassName="active">Statistics</NavLink>
		<NavLink to='/about' className="navLink" activeClassName="active">About</NavLink>
	</nav>
);
