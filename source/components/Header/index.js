import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Icon from 'Components/Icon';
import style from './styles.sass';

export default function Header() {
	return (
		<header className={style.header}>
			<div className={style.headerInner}>
				<div className={style.headerInnerLeft}>
					<Link to='/' className={style.headerLogo}>
						<Icon type='logo' width='45' height='45' className={style.headerLogoInner} />
					</Link>
					<nav className={style.navbar}>
						<ul className={style.navbarItemsWrapper}>
							<li className={style.navbarItem}>
								<NavLink to='/' exact className={style.navbarItemLink} activeClassName={style.navbarItemLinkActive}>Главная</NavLink>
							</li>
							<li className={style.navbarItem}>
								<NavLink to='/top' exact className={style.navbarItemLink} activeClassName={style.navbarItemLinkActive}>Топ игроков</NavLink>
							</li>
							<li className={style.navbarItem}>
								<NavLink to='/blog' exact className={style.navbarItemLink} activeClassName={style.navbarItemLinkActive}>Блог</NavLink>
							</li>
							<li className={style.navbarItem}>
								<NavLink to='/play' exact className={style.navbarItemLink} activeClassName={style.navbarItemLinkActive}>Тест</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className={style.headerInnerMiddle}></div>
				<div className={style.headerInnerRight}>
					<Link to='/auth' className={style.headerBtnSignIn}>Войти</Link>
				</div>
			</div>
		</header>
	);
}