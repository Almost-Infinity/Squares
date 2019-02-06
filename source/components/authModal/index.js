import React, { Component } from 'react';
import $ from 'jquery';
import './styles.sass';

class AuthModal extends Component {
	constructor() {
		super();

		this.state = { authMode: true }; // true - Регистрация, false - Авторизация

		this.toggleAuthMode = () => {
			this.setState({
				authMode: !this.state.authMode
			});
		}
	}

	resize() {
		const marginTop = $(window).height() / 2 - $('.am-window').outerHeight() / 2;
		$('.am-window').css('margin', `${marginTop}px auto`);
	}

	componentDidMount() {
		$(window).bind('resize', this.resize);
	}

	componentWillUnmount() {
		$(window).unbind('resize', this.resize);
	}

	render() {
		const RegisterComponent = (
			<div className="am-content">
				<button className="am-mode-tgl" disabled>Регистрация</button>
				<button className="am-mode-tgl" onClick={this.toggleAuthMode}>Авторизация</button>
				<form className="am-input-form am-reg-form">
					<input className="am-form-input" placeholder="Электронная почта" name="reg-email" />
					<input className="am-form-input" placeholder="Пароль" name="reg-pass" />
					<input className="am-form-input" placeholder="Повтор пароля" name="reg-pass-repeat" />
					<button className="am-form-btn">Зарегистрироваться</button>
				</form>
			</div>
		);

		const AuthComponent = (
			<div className="am-content">
				<button className="am-mode-tgl" onClick={this.toggleAuthMode}>Регистрация</button>
				<button className="am-mode-tgl" disabled>Авторизация</button>
				<form className="am-input-form am-auth-form">
					<input className="am-form-input" placeholder="Электронная почта" name="auth-email" />
					<input className="am-form-input" placeholder="Пароль" name="auth-pass" />
					<button className="am-form-btn">Авторизироваться</button>
				</form>
			</div>
		);

		return (
			<div className="am-background">
				<div className="am-window">
					<div className="am-header">{ this.state.authMode ? 'Регистрация' : 'Авторизация' }</div>
					{ this.state.authMode ? RegisterComponent : AuthComponent }
				</div>
			</div>
		);
	}
}

export default AuthModal;