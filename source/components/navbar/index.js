import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './styles.sass';

import { AppContext } from '../../App-context';
import { AuthModalContext } from '../auth-modal/context';

class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			isSidebarShown: false
		};

		this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this);
	}


	toggleMobileSidebar() {
		this.setState({ isSidebarShown: !this.state.isSidebarShown });
		$('.nav-cont > ul').toggleClass('shown');
	}

	render() {
		return (
			<nav>
				<div className="nav-cont">
					<img src="/static/images/logo.png" alt="Логотип Squares" />
					<ul>
						<li><Link to="/">Главная</Link></li>
						<li><Link to="/rating">Рейтинг</Link></li>
						<li><Link to="/about">Об игре</Link></li>
						<li>
							<AuthModalContext.Consumer>
								{ ({ toggleAuthModal }) => <a href="javascript:void(0)" onClick={ toggleAuthModal }>Вход</a> }
							</AuthModalContext.Consumer>
						</li>
					</ul>
					{ this.context.isMobile ? (
						<React.Fragment>
							{ this.state.isSidebarShown ? <div className="nav-sidebar-overlay" onClick={ this.toggleMobileSidebar }></div> : null }
							<div className="nav-hamburger-wrap" onClick={ this.toggleMobileSidebar }>
								<svg className="nav-hamburger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path d="M426 276H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5zm0 100H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5zm0-200H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
								</svg>
							</div>
						</React.Fragment>
					) : null }
				</div>
			</nav>
		);
	}
}

Navbar.contextType = AppContext;

export default Navbar;