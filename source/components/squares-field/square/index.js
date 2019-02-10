import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Square extends Component {
	constructor(props) {
		super(props);
	}

	pathGenerator(w = 128, h = 128) {
		const lines = Math.ceil((w / 15) * 2); // 20 - расстояние между линиями
		const offsetW = w / Math.floor(lines / 2);
		const offsetH = h / Math.floor(lines / 2);

		let ret = `M0 0 L${w} ${h}`;
		for (let i = 0, ox = 0, ly = h; i < Math.floor(lines / 2); i++) {
			ox += offsetW;
			ly -= offsetH;
			ret += ` M${ox} 0 L${w} ${ly}`;
		}

		for (let i = 0, oy = 0, lx = w - 20; i < Math.floor(lines / 2); i++) {
			oy += offsetH;
			lx = w - offsetW * (i + 1);
			ret += ` M0 ${oy} L${lx} ${h}`;
		}
		return ret;
	}

	render() {
		return (
			<svg className="square" version="1.1" xmlns="http://www.w3.org/2000/svg" width={ `${this.props.width}` } height={ `${this.props.height}` } style={{ margin: '10px' }}>
				<rect width={ `${this.props.width}` } height={ `${this.props.height}` } fill="transparent" strokeWidth="2" stroke={ this.props.color } />
				<path strokeWidth="2" stroke={ this.props.color } d={ this.pathGenerator(this.props.width, this.props.height) } />
			</svg>
		);
	}
}

Square.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	color: PropTypes.string
};

export default Square;