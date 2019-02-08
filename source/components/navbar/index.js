import React, { Component } from 'react';
import './styles.sass';

import { AuthModalContext } from '../authModal/context';

class Navbar extends Component {
	render() {
		return (
			<nav>
				<div className="nav-cont">
					<img src="/static/images/logo.png" alt="Логитип Squares" />
					<ul>
						<li>
							<a href="/">Главная</a>
						</li>

						<li>
							<a href="/rating">Рейтинг</a>
						</li>

						<li>
							<a href="/about">Об игре</a>
						</li>

						<li>
							<a href="javascript:void(0)" onClick={ this.context.toggleAuthModal }>Вход</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

Navbar.contextType = AuthModalContext;

export default Navbar;