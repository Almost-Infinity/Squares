import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles.sass';

export default class Header extends React.Component {
	render() {
		return (
			<header className={ style.header }>
				<div className={ style.headerInner }>
					<div className={ style.headerInnerLeft }>
						<div className={ style.headerLogo } aria-label="логотип">
							<a href="/" className={ style.headerLogoInner }></a>
						</div>
						<nav className={ style.navbar }>
							<ul className={ style.navbarItemsWrapper }>
								<li className={ style.navbarItem }>
									<Link to="/" className={ style.navbarItemLink }>Главная</Link>
								</li>
								<li className={ style.navbarItem }>
									<Link to="/top" className={ style.navbarItemLink }>Топ игроков</Link>
								</li>
								<li className={ style.navbarItem }>
									<Link to="/blog" className={ style.navbarItemLink }>Блог</Link>
								</li>
							</ul>
						</nav>
					</div>
					<div className={ style.headerInnerMiddle }></div>
					<div className={ style.headerInnerRight }>
						<button className={ style.headerBtnSignIn }>Войти</button>
					</div>
				</div>
			</header>
		);
	}
}