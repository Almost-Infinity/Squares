import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../modal';
import $ from 'jquery';
import { AuthModalContext } from './context';
import './styles.sass';

class AuthModal extends Component {
	constructor() {
		super();

		this.state = {
			authOrRestoreMode: true, // true - Авторизация, false - Восстановление парля
			inputError: ''
		};

		this.toggleMode = this.toggleMode.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	toggleMode() {
		this.setState({ authOrRestoreMode: !this.state.authOrRestoreMode });
		$('.auth-form-input').val('');
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({ inputError: '' });

		$.post(this.state.authOrRestoreMode ? '/login' : '/restore-password', $('.auth-input-form').serialize(), data => {
			this.setState({ inputError: data });
		});
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
		const AuthComponent = (
			<React.Fragment>
				<form className="auth-input-form">
					<input className="auth-form-input" placeholder="Электронная почта" name="auth-email" />
					<input className="auth-form-input" placeholder="Пароль" name="auth-pass" />
					<button className="auth-form-btn">Авторизироваться</button>
				</form>
				<Link className="auth-link" to="/registration" onClick={ this.context.toggleAuthModal }>Зарегистрироваться</Link>
				<a className="auth-link" href="javascript:void(0)" onClick={ this.toggleMode }>Восстановить пароль</a>
			</React.Fragment>
		);

		const PassRestoreComponent = (
			<React.Fragment>
				<form className="auth-input-form">
					<input className="auth-form-input" placeholder="Электронная почта" name="restore-email" />
					<button className="auth-form-btn">Отправить запрос</button>
				</form>
				<Link className="auth-link" to="/registration" onClick={ this.context.toggleAuthModal }>Зарегистрироваться</Link>
				<a className="auth-link" href="javascript:void(0)" onClick={ this.toggleMode }>Авторизироваться</a>
			</React.Fragment>
		);

		return (
			<Modal
				title={ this.state.authOrRestoreMode ? 'Авторизация' : 'Восстановление пароля' }
				error_msg={ this.state.inputError }
				content={ this.state.authOrRestoreMode ? AuthComponent : PassRestoreComponent }
				close_fn={ this.context.toggleAuthModal }
			/>
		);
	}
}

AuthModal.contextType = AuthModalContext;

export default AuthModal;