import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sqPoolAdd } from 'Actions';
import styles from './styles.sass';

const CELL_X = 256;
const CELL_Y = ~~(CELL_X / 1.77); // 16:9
const CELL_SIZE = 12; // px
const FIELD_WIDTH = CELL_X * CELL_SIZE;
const FIELD_HEIGHT = CELL_Y * CELL_SIZE;

const MIN_ZOOM = 1;
const ZOOM_STEPS = 5;

class Game extends React.Component {
  static propTypes = {
		sqPool: PropTypes.object.isRequired,
		addSquare: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.field = null;
    this.fieldIMG = null;

    this.RAFHandle = null;
    this.isNeedRedraw = true; // First render

    this.fieldOffsetX = 0;
    this.fieldOffsetY = 0;
    this.fieldScale = 1;
  }

  componentDidMount() {
    this.field = document.getElementsByClassName(styles.field)[0];
    this.field.width = this.field.clientWidth;
    this.field.height = this.field.parentElement.clientHeight;

    this.RAFHandle = requestAnimationFrame(this.update);
    window.addEventListener('resize', this.onWindowResize);
    this.generateField();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.RAFHandle);
    window.removeEventListener('resize', this.onWindowResize);
  }

  setFieldPosition = (x, y) => {
    const maxOffsetX = FIELD_WIDTH - this.field.width * this.fieldScale;
    const maxOffsetY = FIELD_HEIGHT - this.field.height * this.fieldScale;

    this.fieldOffsetX = (x >= 0 && x <= maxOffsetX) ? x : this.fieldOffsetX;
    this.fieldOffsetY = (y >= 0 && y <= maxOffsetY) ? y : this.fieldOffsetY;
  }

  onWindowResize = () => {
    this.field.width = this.field.clientWidth;
    this.field.height = this.field.parentElement.clientHeight;



    this.isNeedRedraw = true;
  }

  onMouseMove = (e) => {
    if (e.buttons & 1) { // LMB
      e.target.style.cursor = 'grabbing';
      this.setFieldPosition(
        this.fieldOffsetX - e.movementX * this.fieldScale,
        this.fieldOffsetY - e.movementY * this.fieldScale
      );
      this.isNeedRedraw = true;
    }
  }

  onMouseWheel = (e) => {
    const maxZoom = Math.min(FIELD_WIDTH / this.field.width, FIELD_HEIGHT / this.field.height);
    const zoomStep = (maxZoom - MIN_ZOOM) / ZOOM_STEPS;
    const zoomDir = e.deltaY > 0 ? 1 : -1;
		const newZoom = zoomStep * zoomDir;
		const nextZoom = this.fieldScale + newZoom;

		if (nextZoom >= 1 && nextZoom <= maxZoom) {
      this.fieldScale = nextZoom;
      this.setFieldPosition(
        this.fieldOffsetX - (e.clientX - e.target.offsetLeft) * newZoom,
        this.fieldOffsetY - (e.clientY - e.target.offsetTop) * newZoom
      );
			this.isNeedRedraw = true;
    }
    console.log(this.fieldScale, FIELD_WIDTH / this.field.width, FIELD_HEIGHT / this.field.height);
  }

  onMouseUp = (e) => {
    if (e.button === 0) {
      e.target.style.cursor = 'default';
    }
  }

  generateField() {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = FIELD_WIDTH;
    ctx.canvas.height = FIELD_HEIGHT;

    // Draw grid
    // ==============
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(51, 55, 69, .25)';

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

    this.fieldIMG = new Image();
    this.fieldIMG.src = ctx.canvas.toDataURL('image/png');
  }

  update = () => {
    if (this.isNeedRedraw) {
      this.isNeedRedraw = false;

      const ctx = this.field.getContext('2d');
      const maxOffsetX = FIELD_WIDTH - this.field.width * this.fieldScale;
      const maxOffsetY = FIELD_HEIGHT - this.field.height * this.fieldScale;
      if ((this.fieldOffsetX >= 0 && this.fieldOffsetX <= maxOffsetX) || (this.fieldOffsetY >= 0 && this.fieldOffsetY <= maxOffsetY)) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
          this.fieldIMG,
          this.fieldOffsetX,
          this.fieldOffsetY,
          ctx.canvas.width * this.fieldScale,
          ctx.canvas.height * this.fieldScale,
          0, 0, ctx.canvas.width, ctx.canvas.height
        );
      }
    }
    this.RAFHandle = requestAnimationFrame(this.update);
  }

  render() {
		return (
      <canvas
        className={ styles.field }
        onMouseMove={ this.onMouseMove }
        onWheel={ this.onMouseWheel }
        onMouseUp={ this.onMouseUp }
      />
		);
	}
}

const mapStateToProps = (state) => ({ sqPool: state.squaresPool });
const mapDispatchToProps = (dispatch) => ({
	addSquare: (square) => dispatch(sqPoolAdd(square)) // Rename function sqPoolAdd
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);