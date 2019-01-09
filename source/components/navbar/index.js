import React, { Component } from 'react'
import './style.sass'

class Navbar extends Component {
	render() {
		return (
			<nav>
				<div className="nav-cont">
					<img src="/" alt="Логитип Squares" />
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
							<a href="/login">Вход</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;