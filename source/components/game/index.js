import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Square from './square';

import styles from './styles.sass';


const CELL_X = 150;
const CELL_Y = Math.round(CELL_X / 1.77); // Cell aspect ratio 16:9

const CELL_SIZE = 20; // px

const FIELD_WIDTH = CELL_X * CELL_SIZE;
const FIELD_HEIGHT = CELL_Y * CELL_SIZE;


class Game extends React.Component {
	static propTypes = {
		sqPool: PropTypes.arrayOf(
			PropTypes.instanceOf(Square)
		).isRequired
	};

	constructor(props) {
		super(props);

		this.field = React.createRef(); // Ref to the canvas
		this.RAFHandle = null;
		this.isNeedRedraw = true; // true - for first draw
		this.viewportOffsetX = 0;
		this.viewportOffsetY = 0;
		this.zoomFactor = 1;
		this.fieldIMG = null;
	}

	componentDidMount() {
		const field = this.field.current;

		field.width = field.clientWidth;
		field.height = field.parentElement.clientHeight;

		this.generateField();

		this.RAFHandle = requestAnimationFrame(this.update);
		field.addEventListener('wheel', this.onMouseScroll);
		field.addEventListener('mousemove', this.onMouseMove);
		field.addEventListener('mouseup', this.onMouseUp);
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount() {
		const field = this.field.current;
		field.removeEventListener('wheel', this.onMouseScroll);
		field.removeEventListener('mousemove', this.onMouseMove);
		field.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('resize', this.onWindowResize);
		cancelAnimationFrame(this.RAFHandle);
	}

	setFieldPosition = (ox, oy) => {
		const field = this.field.current;

		// X
		if (ox < 0) {
			this.viewportOffsetX = 0;
		}
		else if (~~(field.width * this.zoomFactor) + ox > FIELD_WIDTH) {
			this.viewportOffsetX = FIELD_WIDTH - ~~(field.width * this.zoomFactor);
		}
		else {
			this.viewportOffsetX = ox;
		}

		// Y
		if (oy < 0) {
			this.viewportOffsetY = 0;
		}
		else if (~~(field.height * this.zoomFactor) + oy > FIELD_HEIGHT) {
			this.viewportOffsetY = FIELD_HEIGHT - ~~(field.height * this.zoomFactor);
		}
		else {
			this.viewportOffsetY = oy;
		}
	}

	onMouseUp = (e) => {
		if (e.button === 0) {
			e.target.style.cursor = 'default';
		}
	}

	onMouseMove = (e) => {
		if (e.buttons === 1) {
			e.target.style.cursor = 'move';

			this.setFieldPosition(this.viewportOffsetX - e.movementX, this.viewportOffsetY - e.movementY);
			this.isNeedRedraw = true;
		}
	}

	onMouseScroll = (e) => {
		const zoomStep = 0.05;
		const zoomDir = e.deltaY > 0 ? 1 : -1;
		const newZoom = zoomDir * zoomStep;

		if (this.zoomFactor + newZoom > 1) {
			const field = this.field.current;
			const newOffsetX = this.viewportOffsetX - e.offsetX * newZoom;
			const newOffsetY = this.viewportOffsetY - e.offsetY * newZoom;

			if ((field.width <= Math.round(FIELD_WIDTH / (this.zoomFactor + newZoom))) && (field.height <= Math.round(FIELD_HEIGHT / (this.zoomFactor + newZoom)))) {
				this.zoomFactor += newZoom;
				this.setFieldPosition(newOffsetX, newOffsetY);
			}
			else {
				// X axis zoom correction
				if ((this.zoomFactor + zoomStep) * field.width > FIELD_WIDTH) {
					this.zoomFactor = FIELD_WIDTH / field.width;
				}

				// Y axis zoom correction
				if ((this.zoomFactor + zoomStep) * field.height > FIELD_HEIGHT) {
					this.zoomFactor = FIELD_HEIGHT / field.height;
				}
			}

			this.isNeedRedraw = true;
		}
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

	generateField = () => {
		const ctx = document.createElement('canvas').getContext('2d');
		ctx.canvas.width = FIELD_WIDTH;
		ctx.canvas.height = FIELD_HEIGHT;

		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(153, 153, 153, .5)';

		// Draw grid
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
			ctx.fillRect(s.pos.x * CELL_SIZE, s.pos.y * CELL_SIZE, s.size.w * CELL_SIZE, s.size.h * CELL_SIZE);
			ctx.fill();
		}
	
		this.fieldIMG = new Image();
		this.fieldIMG.src = ctx.canvas.toDataURL("image/png");
	}

	update = () => {
		if (this.isNeedRedraw) {
			this.isNeedRedraw = false;
			const field = this.field.current;
			const ctx = field.getContext('2d');

			ctx.clearRect(0, 0, field.width, field.height);
			ctx.drawImage(this.fieldIMG, this.viewportOffsetX, this.viewportOffsetY, field.width * this.zoomFactor, field.height * this.zoomFactor, 0, 0, field.width, field.height);
		}
		this.RAFHandle = requestAnimationFrame(this.update);
	}

	render() {
		return <canvas ref={ this.field } className={ styles.field }></canvas>;
	}
}

const mapStateToProps = (state) => ({
  sqPool: state.squaresPool
});

export default connect(mapStateToProps)(Game);