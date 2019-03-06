import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './styles.sass';

import { AppContext } from '../../App-context';

export default class Header extends Component {
	static propTypes = {
		toggleAuthModal: PropTypes.func.isRequired
	};

	static contextType = AppContext;

	state = {
		isSidebarShown: false
	};

	constructor() {
		super();

		this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this);
	}


	toggleMobileSidebar() {
		this.setState({ isSidebarShown: !this.state.isSidebarShown });
		$('.nav-cont > ul').toggleClass('shown');
	}

	componentDidMount() {
		document.querySelectorAll('.nav-cont ul a').forEach((el) => {
			el.addEventListener('click', this.toggleMobileSidebar);
		});
	}

	componentWillUnmount() {
		document.querySelectorAll('.nav-cont ul a').forEach((el) => {
			el.removeEventListener('click', this.toggleMobileSidebar);
		});
	}

	render() {
		const { toggleAuthModal } = this.props;

		return (
			<header>
				<div className="header-inner">
					<div className="header-left">
						<div className="header-logo">
							<Link to="/"></Link>
						</div>
						<nav>
							<ul>
								<li><Link to="/rating">Рейтинг</Link></li>
								<li><Link to="/about">Об игре</Link></li>
							</ul>
						</nav>
					</div>
					<div className="header-middle"></div>
					<div className="header-right">
						<a role="button" className="header-login" href="javascript:void(0)" onClick={ toggleAuthModal }>Вход</a>
						<Link role="button" to="/registration" className="header-reg">Регистрация</Link>
					</div>
					{ 
						this.context.isMobile
							? <React.Fragment>
								{
									this.state.isSidebarShown
										? <div className="nav-sidebar-overlay" onClick={ this.toggleMobileSidebar }></div>
										: null
								}
								<div className="nav-hamburger-wrap" onClick={ this.toggleMobileSidebar }>
									<svg className="nav-hamburger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M426 276H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5zm0 100H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5zm0-200H86c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h340c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
									</svg>
								</div>
							</React.Fragment>
							: null
					}
				</div>
			</header>
		);
	}
}