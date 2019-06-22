import React from 'react';
import { Link } from 'react-router-dom';

import style from './styles.sass';

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
								<Link to="/" className={ style.navbarItemLink }>Главная</Link>
							</li>
							<li className={ style.navbarItem }>
								<Link to="/top" className={ style.navbarItemLink }>Топ игроков</Link>
							</li>
							<li className={ style.navbarItem }>
								<Link to="/blog" className={ style.navbarItemLink }>Блог</Link>
							</li>
							<li className={ style.navbarItem }>
								<Link to="/play" className={ style.navbarItemLink }>Тест</Link>
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