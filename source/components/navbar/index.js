import React, { Component } from 'react';
import './styles.sass';

import { AuthModalContext } from '../authModal/auth-modal-context';

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

						<AuthModalContext.Consumer>
							{({ toggleAuthModal }) => (
								<li>
									<a href="javascript:void(0)" onClick={toggleAuthModal}>Вход</a>
								</li>
							)}
						</AuthModalContext.Consumer>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;