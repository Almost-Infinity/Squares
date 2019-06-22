import React from 'react';
import PropTypes from 'prop-types';

import * as U from '../../utility';
import { CELL_X, CELL_Y } from './constants';
import Square from './square';

import styles from './styles.sass';

const drawGrid = (ctx, canvSize) => {
	const CELL_SIZE_X = canvSize.w / CELL_X;
	const CELL_SIZE_Y = canvSize.h / CELL_Y;

	ctx.beginPath();
	for (let i = 1; i < CELL_X; i++) {
		ctx.moveTo(0 + CELL_SIZE_X * i, 0);
		ctx.lineTo(0 + CELL_SIZE_X * i, canvSize.h);
	}

	for (let i = 1; i < CELL_Y; i++) {
		ctx.moveTo(0, 0 + CELL_SIZE_Y * i);
		ctx.lineTo(canvSize.w, 0 + CELL_SIZE_Y * i);
	}
	ctx.stroke();
}

export default class Game extends React.Component {
	static propTypes = {
		sqPool: PropTypes.arrayOf(Square).isRequired
	};

	constructor(props) {
		super(props);
		this.fieldRef = null;
		this.AFHandle = null
		this.fieldSize = {};

		this.grabOffsetX = 0;
		this.grabOffsetY = 0;
		this.grabbedSq = null;
		this.isNeedRedraw = true; // true for first draw

		this.state = {
			squaresPool: [
				new Square({ x: 0, y: 0 }, { w: 10, h: 10 }, 'red'),
				new Square({ x: 20, y: 5 }, { w: 20, h: 10 }, 'green'),
				new Square({ x: 45, y: 25 }, { w: 10, h: 15 }, 'blue'),
				new Square({ x: 60, y: 20 }, { w: 20, h: 15 }, 'orange')
			]
		};
	}

	isIntersect = (cursorXpx, cursorYpx) => {
		const cursorPosX = Math.floor(cursorXpx / (this.fieldSize.w / CELL_X)); 
		const cursorPosY = Math.floor(cursorYpx / (this.fieldSize.h / CELL_Y));

		for (let s of this.state.squaresPool) {
			if (cursorPosX >= s.pos.x && cursorPosX < s.pos.x + s.size.w &&
				cursorPosY >= s.pos.y && cursorPosY < s.pos.y + s.size.h) {
					return s;
			}
		}
		return false;
	}

	onMouseMove = (e) => {
		if (this.grabbedSq instanceof Square) {
			// const cursorPosX = Math.floor((e.layerX - this.grabOffsetX) / (this.fieldSize.w / CELL_X)); 
			// const cursorPosY = Math.floor((e.layerY - this.grabOffsetY) / (this.fieldSize.h / CELL_Y));

			console.log('move');

			// this.grabbedSq.setPos(cursorPosX, cursorPosY, this.fieldSize, false);
			this.grabbedSq.setPos(100, 100, this.fieldSize, false);
			this.isNeedRedraw = true;
		}
		else {
			if (this.isIntersect(e.layerX, e.layerY)) {
				U.addClass(e.target, 'grab');
			}
			else {
				U.removeClass(e.target, 'grab');
			}
		}
	}

	onMouseKey = (e) => {
		if (e.type === 'mousedown') {
			if (e.which === 1) {
				const sq = this.isIntersect(e.layerX, e.layerY);
				if (sq instanceof Square) {
					this.grabbedSq = sq;
					this.grabOffsetX = e.layerX - (sq.pos.x / (this.fieldSize.w / CELL_X));
					this.grabOffsetY = e.layerY - (sq.pos.y / (this.fieldSize.h / CELL_Y));
				}
			}
		}
		else if (e.type == 'mouseup') {
			if (e.which === 1) {
				this.grabbedSq = null;
				this.grabOffsetX = 0;
				this.grabOffsetY = 0;
			}
		}
	}

	componentDidMount() {
		const { fieldRef } = this;
		const parentWidth = fieldRef.parentElement.clientWidth;
		fieldRef.width = parentWidth;
		fieldRef.height = parentWidth / (window.outerWidth / window.outerHeight) * 0.9;

		this.fieldSize = {
			w: fieldRef.width,
			h: fieldRef.height
		};

		this.fieldRef.addEventListener('mousedown', this.onMouseKey);
		this.fieldRef.addEventListener('mouseup', this.onMouseKey);
		this.fieldRef.addEventListener('mousemove', this.onMouseMove);
		this.AFHandle = requestAnimationFrame(this.update);
	}

	componentWillUnmount() {
		this.fieldRef.removeEventListener('mousedown', this.onMouseKey);
		this.fieldRef.removeEventListener('mouseup', this.onMouseKey);
		this.fieldRef.removeEventListener('mousemove', this.onMouseMove);
		cancelAnimationFrame(this.AFHandle);
	}

	update = () => {
		if (this.isNeedRedraw) {
			this.isNeedRedraw = false;

			const { fieldSize } = this;
			const ctx = this.fieldRef.getContext('2d');
			ctx.clearRect(0, 0, fieldSize.w, fieldSize.h);

			ctx.strokeStyle = 'rgba(153, 153, 153, .3)';
			drawGrid(ctx, this.fieldSize);

			const CELL_SIZE_X = this.fieldSize.w / CELL_X;
			const CELL_SIZE_Y = this.fieldSize.h / CELL_Y;

			for (let s of this.state.squaresPool) {
				ctx.fillStyle = s.color;
				ctx.fillRect(s.pos.x * CELL_SIZE_X, s.pos.y * CELL_SIZE_Y, s.size.w * CELL_SIZE_X, s.size.h * CELL_SIZE_Y);
				ctx.fill();
			}
		}
		this.AFHandle = requestAnimationFrame(this.update);
	}

	render() {
		return <canvas ref={ (node) => this.fieldRef = node } className={styles.field}></canvas>;
	}
}