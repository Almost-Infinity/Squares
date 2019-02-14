import React, { Component } from 'react';
import Layout from './components/layout';
import { AppContext } from './App-context';

class App extends Component {
	constructor() {
		super();

		this.state = {
			wndWidth: 0,
			wndHeight: 0,
			isMobile: false
		};

		this.onWndResize = this.onWndResize.bind(this);
	}

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
			<AppContext.Provider value={ this.state }>
				<Layout />
			</AppContext.Provider>
		);
	}
}

export default App;