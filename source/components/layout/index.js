import React, { Component } from 'react'
import Navbar from '../navbar'
import './styles.sass'

class Layout extends Component {
	render() {
		return (
			<div className="layout">
				<Navbar />
				<div className="content"></div>
			</div>
		);
	}
}

export default Layout;