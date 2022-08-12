import React from 'react';
import logo from '../assets/img/logo.svg'

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="header__inner">
					<a href="#" className="header__logo">
						<img src={logo} alt=""/>
					</a>
					<div className="header__cabinet">
						<a href="#" className="btn btn--yellow">Users</a>
						<a href="#" className="btn btn--yellow">Sign up</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;