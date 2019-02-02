import React, { Component } from 'react';
import Navbar from '../navbar';
import Game from '../game';
import './styles.sass';

class Layout extends Component {
	render() {
		return (
			<div className="layout">
				<Navbar />
				<div className="content">
					<Game />
				</div>
			</div>
		);
	}
}

export default Layout;