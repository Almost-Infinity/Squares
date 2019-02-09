import React, { Component } from 'react';
import Navbar from '../navbar';
import Game from '../game';
import AuthModal from '../auth-modal';
import './styles.sass';

import { AuthModalContext } from '../auth-modal/context';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.toggleAuthModal = () => {
			this.setState({
				isAuthModalShown: !this.state.isAuthModalShown
			});
		}

		this.state = {
			isAuthModalShown: false,
			toggleAuthModal: this.toggleAuthModal
		};
	}

	render() {
		return (
			<div className="layout">
				<AuthModalContext.Provider value={ this.state }>
					{ this.state.isAuthModalShown ? <AuthModal /> : null }
					<Navbar />
				</AuthModalContext.Provider>

				<div className="content">
					<Game />
				</div>
			</div>
		);
	}
}

export default Layout;