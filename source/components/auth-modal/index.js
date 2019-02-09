import React, { Component } from 'react';
import Modal from '../modal';
import $ from 'jquery';
import { AuthModalContext } from './context';
import './styles.sass';

class AuthModal extends Component {
	constructor() {
		super();

		this.state = {
			authMode: true, // true - Регистрация, false - Авторизация
			inputError: false
		}; 

		this.toggleAuthMode = () => {
			this.setState({
				authMode: !this.state.authMode
			});
			$('.auth-form-input').val('');
		}

		this.onFormSubmit = (event) => {
			event.preventDefault();

			$.post(this.state.authMode ? '/register' : '/login', $('.auth-input-form').serialize(), data => {
				this.setState({
					inputError: data
				});
			});
		}
	}

	componentDidMount() {
		$('.auth-input-form').bind('submit', this.onFormSubmit);
	}

	componentWillUnmount() {
		$('.auth-input-form').unbind('submit', this.onFormSubmit);
	}

	componentWillUpdate() {
		$('.auth-input-form').unbind('submit', this.onFormSubmit);
	}

	componentDidUpdate() {
		$('.auth-input-form').bind('submit', this.onFormSubmit);
	}

	render() {
		const RegisterComponent = (
			<React.Fragment>
				{ this.state.inputError ? <div className="auth-input-error">{ this.state.inputError }</div> : null }
				<button className="auth-mode-tgl" disabled>Регистрация</button>
				<button className="auth-mode-tgl" onClick={ this.toggleAuthMode }>Авторизация</button>
				<form className="auth-input-form">
					<input className="auth-form-input" placeholder="Отображаемое имя" name="reg-name" />
					<input className="auth-form-input" placeholder="Электронная почта" name="reg-email" />
					<input className="auth-form-input" placeholder="Пароль" name="reg-pass" />
					<input className="auth-form-input" placeholder="Повтор пароля" name="reg-pass-repeat" />
					<button className="auth-form-btn">Зарегистрироваться</button>
				</form>
			</React.Fragment>
		);

		const AuthComponent = (
			<React.Fragment>
				{ this.state.inputError ? <div className="auth-input-error">{ this.state.inputError }</div> : null }
				<button className="auth-mode-tgl" onClick={ this.toggleAuthMode }>Регистрация</button>
				<button className="auth-mode-tgl" disabled>Авторизация</button>
				<form className="auth-input-form">
					<input className="auth-form-input" placeholder="Электронная почта" name="auth-email" />
					<input className="auth-form-input" placeholder="Пароль" name="auth-pass" />
					<button className="auth-form-btn">Авторизироваться</button>
				</form>
			</React.Fragment>
		);

		return (
			<Modal
				title={ this.state.authMode ? 'Регистрация' : 'Авторизация' }
				content={ this.state.authMode ? RegisterComponent : AuthComponent }
				close_fn={ this.context.toggleAuthModal }
			/>
		);
	}
}

AuthModal.contextType = AuthModalContext;

export default AuthModal;