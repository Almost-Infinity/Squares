import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

export default class Square extends Component {
	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		color: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	pathGenerator(w = 128, h = 128) {
		const biggestSide = Math.max(w, h),
			lines = Math.floor(biggestSide / 15) + 1,
			offsetW = w / lines,
			offsetH = h / lines;

		let ret = `M0 0 L${w} ${h}`;
		for (let i = 0, ox = offsetW, ly = h - offsetH; i < lines - 1; i++, ox += offsetW, ly -= offsetH) {
			ret += ` M${ox} 0 L${w} ${ly}`;
		}

		for (let i = 0, oy = offsetH, lx = w - offsetW; i < lines - 1; i++, oy += offsetH, lx -= offsetW) {
			ret += ` M0 ${oy} L${lx} ${h}`;
		}
		return ret;
	}

	render() {
		return (
			<svg className="square" version="1.1" xmlns="http://www.w3.org/2000/svg" width={ `${this.props.width}` } height={ `${this.props.height}` }>
				<rect
					width={ `${this.props.width}` }
					height={ `${this.props.height}` }
					fill="transparent"
					strokeWidth="2"
					stroke={ this.props.color }
				/>
				<path
					strokeWidth="1"
					stroke={ this.props.color }
					d={ this.pathGenerator(this.props.width, this.props.height) }
				/>
			</svg>
		);
	}
}