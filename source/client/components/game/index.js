import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sqPoolAdd } from 'Actions';

import Overlay from '../overlay';
import Square from './square';

import styles from './styles.sass';


const CELL_X = 150;
const CELL_Y = Math.round(CELL_X / 1.77); // Cell aspect ratio 16:9

const CELL_SIZE = 15; // px

const FIELD_WIDTH = CELL_X * CELL_SIZE;
const FIELD_HEIGHT = CELL_Y * CELL_SIZE;

const MIN_ZOOM = 1;
const ZOOM_STEPS = 10;

class Game extends React.Component {
	static propTypes = {
		sqPool: PropTypes.arrayOf(PropTypes.instanceOf(Square)).isRequired,
		addSquare: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.field = React.createRef(); // Ref to the canvas
		this.RAFHandle = null;
		this.isNeedRedraw = true; // true - for first draw

		this.zoomFactor = 1;
		this.fieldIMG = null;

		this.canvasOffsetX = 0;
		this.canvasOffsetY = 0;

		this.cursorX = 0;
		this.cursorY = 0;

		// Canvas selection
		this.selInitialX = 0;
		this.selInitialY = 0;
		this.selX = null;
		this.selY = null;
		this.selW = 1;
		this.selH = 1;
		this.isIntersected = false;

		this.state = {
			isScoreboardShown: false
		};
	}

	componentDidMount() {
		const field = this.field.current;

		field.width = ~~field.clientWidth;
		field.height = ~~field.parentElement.clientHeight;

		this.generateField();

		this.RAFHandle = requestAnimationFrame(this.update);
		field.addEventListener('wheel', this.onMouseScroll);
		field.addEventListener('mousemove', this.onMouseMove);
		field.addEventListener('mouseup', this.onMouseUp);
		field.addEventListener('mousedown', this.onMouseDown);
		field.addEventListener('mouseout', this.onMouseOut);
		document.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount() {
		const field = this.field.current;

		field.removeEventListener('wheel', this.onMouseScroll);
		field.removeEventListener('mousemove', this.onMouseMove);
		field.removeEventListener('mouseup', this.onMouseUp);
		field.removeEventListener('mousedown', this.onMouseDown);
		field.removeEventListener('mouseout', this.onMouseOut);
		document.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('resize', this.onWindowResize);
		cancelAnimationFrame(this.RAFHandle);
	}

	setFieldPosition = (ox, oy) => {
		const { width, height } = this.field.current;

		this.canvasOffsetX = (ox < 0) ?
			0 : (~~(ox + width * this.zoomFactor) > FIELD_WIDTH) ?
			FIELD_WIDTH - ~~(width * this.zoomFactor) : ox;

		this.canvasOffsetY = (oy < 0) ?
			0 : (~~(oy + height * this.zoomFactor) > FIELD_HEIGHT) ?
			FIELD_HEIGHT - ~~(height * this.zoomFactor) : oy;
	}

	onMouseDown = () => {
		this.selInitialX = this.cursorX;
		this.selInitialY = this.cursorY;

		this.isNeedRedraw = true;
	}

	onMouseUp = (e) => {
		if (e.button === 0) { // LMB
			e.target.style.cursor = 'default';

			if (!this.isIntersected && !e.ctrlKey) {
				this.props.addSquare({
					x: this.selX || this.selInitialX,
					y: this.selY || this.selInitialY,
					w: this.selW,
					h: this.selH,
					c: 'tomato'
				});
				this.generateField();
			}

			this.selY = this.selX = null;
			this.selW = this.selH = 1;

			this.isNeedRedraw = true;
		}
	}

	onMouseMove = (e) => {
		let { cursorX, cursorY } = this;

		// Watching the cursor pos
		const cellSize = CELL_SIZE / this.zoomFactor;
		const cx = ~~((this.canvasOffsetX / this.zoomFactor + e.offsetX) / cellSize);
		const cy = ~~((this.canvasOffsetY / this.zoomFactor + e.offsetY) / cellSize);
		if ((cx >= 0 && cx < CELL_X) && (cy >= 0 && cy < CELL_Y)) {
			this.cursorX = cx;
			this.cursorY = cy;
		}

		// Handling
		if (e.buttons === 1) {
			if (e.ctrlKey) { // Moving
				e.target.style.cursor = 'move';

				this.selX = this.selY = null;

				this.setFieldPosition(this.canvasOffsetX - e.movementX, this.canvasOffsetY - e.movementY);
			}
			else { // Drawing
				e.target.style.cursor = 'crosshair';

				const minX = Math.min(this.selInitialX, cursorX);
				const minY = Math.min(this.selInitialY, cursorY);

				const maxX = Math.max(this.selInitialX, cursorX);
				const maxY = Math.max(this.selInitialY, cursorY);

				this.selX = minX;
				this.selY = minY;
				this.selW = maxX - minX + 1;
				this.selH = maxY - minY + 1;

				for (let s of this.props.sqPool) {
					if ((this.isIntersected = s.haveIntersection(minX, minY, this.selW, this.selH))) {
						break;
					}
				}
			}
			this.isNeedRedraw = true;
		}
	}

	onMouseScroll = (e) => {
		this.selX = this.selY = null;

		const field = this.field.current;
		const maxZoom = Math.min(FIELD_WIDTH / field.width, FIELD_HEIGHT / field.height);
		const zoomStep = (maxZoom - MIN_ZOOM) / ZOOM_STEPS;
		const zoomDir = e.deltaY > 0 ? 1 : -1;
		const newZoom = zoomStep * zoomDir;
		const nextZoom = this.zoomFactor + newZoom;

		if (nextZoom >= MIN_ZOOM && nextZoom <= maxZoom) {
			this.zoomFactor = nextZoom;

			const newOffsetX = this.canvasOffsetX - e.offsetX * newZoom;
			const newOffsetY = this.canvasOffsetY - e.offsetY * newZoom;
			this.setFieldPosition(newOffsetX, newOffsetY);
			
			this.isNeedRedraw = true;
		}
	}

	onMouseOut = () => {
		this.selY = this.selX = null;
		this.selW = this.selH = 1;
		this.isNeedRedraw = true;
	}

	onWindowResize = () => {
		const field = this.field.current;

		field.width = ~~field.clientWidth;
		field.height = ~~field.parentElement.clientHeight;

		// X axis fix overzoom
		if (FIELD_WIDTH / field.width < this.zoomFactor) {
			this.zoomFactor = FIELD_WIDTH / field.width;
		}

		// Y axis fix overzoom
		if (FIELD_HEIGHT / field.height < this.zoomFactor) {
			this.zoomFactor = FIELD_HEIGHT / field.height;
		}

		this.isNeedRedraw = true;
	}

	onKeyDown = (e) => {
		switch (e.keyCode) {
			case 121: { // F10
				e.preventDefault();
				this.field.current.requestFullscreen();
				break;
			}
			case 9: { // Tab
				e.preventDefault();
				this.setState((state) =>
					({ isScoreboardShown: !state.isScoreboardShown })
				);
				break;
			}
		}
	}

	generateField = () => {
		const ctx = document.createElement('canvas').getContext('2d');
		ctx.canvas.width = FIELD_WIDTH;
		ctx.canvas.height = FIELD_HEIGHT;
		
		// Draw grid
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(153, 153, 153, .5)';
		
		ctx.beginPath();
		for (let i = 1; i < CELL_X; i++) { // Vertical lines
			ctx.moveTo(CELL_SIZE * i, 0);
			ctx.lineTo(CELL_SIZE * i, FIELD_HEIGHT);
		}

		for (let i = 1; i < CELL_Y; i++) { // Horizontal lines
			ctx.moveTo(0, CELL_SIZE * i);
			ctx.lineTo(FIELD_WIDTH, CELL_SIZE * i);
		}
		ctx.stroke();

		// Draw squares
		for (let s of this.props.sqPool) {
			ctx.fillStyle = s.color;
			ctx.strokeStyle = '#333';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.rect(s.pos.x * CELL_SIZE, s.pos.y * CELL_SIZE, s.size.w * CELL_SIZE, s.size.h * CELL_SIZE);
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = '#333';
			ctx.font = 'bold 16px Roboto';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText(
				`${s.size.w * s.size.h}`, 
				(s.pos.x + (s.size.w / 2)) * CELL_SIZE,
				(s.pos.y + (s.size.h / 2)) * CELL_SIZE
			);
		}
	
		this.fieldIMG = new Image();
		this.fieldIMG.src = ctx.canvas.toDataURL('image/png');
	}

	update = () => {
		if (this.isNeedRedraw) {
			this.isNeedRedraw = false;
			const field = this.field.current;
			const ctx = field.getContext('2d');

			ctx.clearRect(0, 0, field.width, field.height);
			ctx.drawImage(this.fieldIMG, this.canvasOffsetX, this.canvasOffsetY, field.width * this.zoomFactor, field.height * this.zoomFactor, 0, 0, field.width, field.height);
		
			// Highlighting area under the cursor
			const { selX, selY, selW, selH } = this;
			if (selX !== null && selY !== null) {
				ctx.save();
				ctx.strokeStyle = this.isIntersected ? '#d13d3d' : '#3dbbd1';
				ctx.lineWidth = 2;

				const cellSize = CELL_SIZE / this.zoomFactor;
				const px = selX * cellSize - this.canvasOffsetX / this.zoomFactor;
				const py = selY * cellSize - this.canvasOffsetY / this.zoomFactor; 

				ctx.strokeRect(
					selW < 0 ? px + cellSize : px,
					selH < 0 ? py + cellSize : py,
					selW * cellSize,
					selH * cellSize
				);
				ctx.restore();
			}

		}
		this.RAFHandle = requestAnimationFrame(this.update);
	}

	render() {
		return (
			<React.Fragment>
				<canvas ref={ this.field } className={ styles.field }></canvas>
				{ this.state.isScoreboardShown &&
					<Overlay>
						
					</Overlay>
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({ sqPool: state.squaresPool });
const mapDispatchToProps = (dispatch) => ({
	addSquare: (square) => dispatch(sqPoolAdd(square))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);