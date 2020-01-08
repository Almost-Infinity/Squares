import React 							from 'react';
import { Link, NavLink } 	from 'react-router-dom';

import style 							from './styles.sass';

export default function Header() {
	return (
		<header className={ style.header }>
			<div className={ style.headerInner }>
				<div className={ style.headerInnerLeft }>
					<div className={ style.headerLogo } aria-label="логотип">
						<Link to="/" className={ style.headerLogoInner }></Link>
					</div>
					<nav className={ style.navbar }>
						<ul className={ style.navbarItemsWrapper }>
							<li className={ style.navbarItem }>
								<NavLink to="/" exact className={ style.navbarItemLink } activeClassName={ style.navbarItemLinkActive }>Главная</NavLink>
							</li>
							<li className={ style.navbarItem }>
								<NavLink to="/top" exact className={ style.navbarItemLink } activeClassName={ style.navbarItemLinkActive }>Топ игроков</NavLink>
							</li>
							<li className={ style.navbarItem }>
								<NavLink to="/blog" exact className={ style.navbarItemLink } activeClassName={ style.navbarItemLinkActive }>Блог</NavLink>
							</li>
							<li className={ style.navbarItem }>
								<NavLink to="/play" exact className={ style.navbarItemLink } activeClassName={ style.navbarItemLinkActive }>Тест</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className={ style.headerInnerMiddle }></div>
				<div className={ style.headerInnerRight }>
					<Link to="/auth" className={ style.headerBtnSignIn }>Войти</Link>
				</div>
			</div>
		</header>
	);
}