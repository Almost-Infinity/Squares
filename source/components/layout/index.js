import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
			<Router>
				<div className="layout">
					<AuthModalContext.Provider value={ this.state }>
						{ this.state.isAuthModalShown ? <AuthModal /> : null }
						<Navbar />
					</AuthModalContext.Provider>

					<div className="content">
						<Route exact path="/" component={Game} />
					</div>
				</div>
			</Router>
		);
	}
}

export default Layout;