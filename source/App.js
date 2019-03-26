import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header';
import Game from './components/game';
import Registration from './components/registration';
import AuthModal from './components/auth-modal';
import './sass/main.sass';

const AppCtx = createContext();
export { AppCtx };

class App extends Component {
	state = {
		wndWidth: 0,
		wndHeight: 0,
		isMobile: false,
		isAuthModalShown: false
	};

	constructor() {
		super();

		this.onWndResize = this.onWndResize.bind(this);
		this.toggleAuthModal = this.toggleAuthModal.bind(this);
	}


	// ============================
	// Methods
	// ============================
	toggleAuthModal() {
		this.setState({
			isAuthModalShown: !this.state.isAuthModalShown
		});
	}


	// ============================
	// Events
	// ============================
	componentDidMount() {
		this.onWndResize();
		window.addEventListener('resize', this.onWndResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWndResize);
	}

	onWndResize() {
		this.setState({
			wndHeight: window.innerHeight,
			wndWidth: window.innerWidth,
			isMobile: (window.innerWidth <= 768) // 768 – tablet max width
		});
	}

	render() {
		return (
			<AppCtx.Provider value={ this.state }>
				<Router>
					<React.Fragment>
						{ this.state.isAuthModalShown ? <AuthModal toggleAuthModal={ this.toggleAuthModal } /> : null }
						<Header toggleAuthModal={ this.toggleAuthModal } />

						<div className="content">
							<Route exact path="/" component={Game} />
							<Route exact path="/registration" component={Registration} />
						</div>
					</React.Fragment>
				</Router>
			</AppCtx.Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));