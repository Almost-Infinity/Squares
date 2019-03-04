import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import $ from 'jquery';
import './styles.sass';

class AuthModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authOrRestoreMode: true, // true - Авторизация, false - Восстановление парля
			inputError: ''
		};

		this.toggleMode = this.toggleMode.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	toggleMode() {
		this.setState({ authOrRestoreMode: !this.state.authOrRestoreMode });
		$('.auth-input').val('');
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({ inputError: '' });

		$.post(this.state.authOrRestoreMode ? '/login' : '/restore-password', $('.auth-input').serialize(), data => {
			this.setState({ inputError: data });
		});
	}

	componentDidMount() {
		$('.auth-input').bind('submit', this.onFormSubmit);
	}

	componentWillUnmount() {
		$('.auth-input').unbind('submit', this.onFormSubmit);
	}

	componentWillUpdate() {
		$('.auth-input').unbind('submit', this.onFormSubmit);
	}

	componentDidUpdate() {
		$('.auth-input').bind('submit', this.onFormSubmit);
	}

	render() {
		const { toggleAuthModal } = this.props;

		const AuthComponent = (
			<React.Fragment>
				<form className="auth-form clearfix">
					<label className="auth-input-label">
						Электронная почта
						<input className="auth-input" name="auth-email" />
					</label>
					<label className="auth-input-label">
						Пароль
						<a className="auth-link" href="javascript:void(0)" onClick={ this.toggleMode }>Восстановить</a>
						<input className="auth-input" name="auth-pass" />
					</label>
					<label className="auth-checkbox">
						<input type="checkbox" name="auth-remember" />
						<span className="checkbox"></span>
						Запомнить
					</label>
					<button className="auth-submit">Войти</button>
				</form>
			</React.Fragment>
		);

		const PassRestoreComponent = (
			<React.Fragment>
				<form className="auth-input">
					<input className="auth-input" placeholder="Электронная почта" name="restore-email" />
					<button className="auth-form-btn">Отправить запрос</button>
				</form>
				<a className="auth-link" href="javascript:void(0)" onClick={ this.toggleMode }>Авторизироваться</a>
			</React.Fragment>
		);

		return (
			<Modal
				title={ this.state.authOrRestoreMode ? 'Авторизация' : 'Восстановление пароля' }
				error_msg={ this.state.inputError }
				content={ this.state.authOrRestoreMode ? AuthComponent : PassRestoreComponent }
				close_fn={ toggleAuthModal }
			/>
		);
	}
}

AuthModal.propTypes = {
	toggleAuthModal: PropTypes.func.isRequired
};

export default AuthModal;