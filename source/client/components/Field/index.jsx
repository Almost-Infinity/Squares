import React          from 'react';
import { connect }    from 'react-redux';
import PropTypes      from 'prop-types';

import { sqPoolAdd }  from 'Actions';
import styles         from './styles.sass';

const CELL_X = 256;
const CELL_Y = ~~(CELL_X / 1.77); // 16:9
const CELL_SIZE = 12; // px
const FIELD_WIDTH = CELL_X * CELL_SIZE;
const FIELD_HEIGHT = CELL_Y * CELL_SIZE;

class Game extends React.Component {
  static propTypes = {
		sqPool: PropTypes.object.isRequired,
		addSquare: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.field = null;
    this.fieldLayerGrid = null;
    this.fieldLayerSquares = null;

    this.RAFHandle = null;
    this.isNeedRedraw = true; // First render

    this.fieldOffsetX = 0;
    this.fieldOffsetY = 0;
  }

  componentDidMount() {
    this.field = document.getElementById('field');
    this.field.width = this.field.parentElement.clientWidth;
    this.field.height = this.field.parentElement.clientHeight - 45; // Header height

    this.RAFHandle = requestAnimationFrame(this.update);
    window.addEventListener('resize', this.onWindowResize);
    this.generateLayerGrid();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.RAFHandle);
    window.removeEventListener('resize', this.onWindowResize);
  }

  setFieldPosition = (x, y) => {
    const maxOffsetX = FIELD_WIDTH - this.field.width;
    const maxOffsetY = FIELD_HEIGHT - this.field.height;

    this.fieldOffsetX = (x >= 0 && x <= maxOffsetX) ? x : this.fieldOffsetX;
    this.fieldOffsetY = (y >= 0 && y <= maxOffsetY) ? y : this.fieldOffsetY;
  }

  onWindowResize = () => {
    this.field.width = this.field.parentElement.clientWidth;
    this.field.height = this.field.parentElement.clientHeight - 45; // Header height

    const maxOffsetX = FIELD_WIDTH - this.field.width;
    const maxOffsetY = FIELD_HEIGHT - this.field.height;

    this.fieldOffsetX -= (this.fieldOffsetX > maxOffsetX) ? this.fieldOffsetX - maxOffsetX : 0;
    this.fieldOffsetY -= (this.fieldOffsetY > maxOffsetY) ? this.fieldOffsetY - maxOffsetY : 0;

    this.isNeedRedraw = true;
  }

  onMouseMove = (e) => {
    if (e.buttons & 1) { // LMB
      e.target.style.cursor = 'grabbing';
      this.setFieldPosition(
        this.fieldOffsetX - e.movementX,
        this.fieldOffsetY - e.movementY
      );
      this.isNeedRedraw = true;
    }
  }

  onMouseUp = (e) => {
    if (e.button === 0) {
      e.target.style.cursor = 'default';
    }
  }

  generateLayerGrid() {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = FIELD_WIDTH;
    ctx.canvas.height = FIELD_HEIGHT;
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

    this.fieldLayerGrid = new Image();
    this.fieldLayerGrid.src = ctx.canvas.toDataURL('image/png');
  }

  generateLayerSquares() {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = FIELD_WIDTH;
    ctx.canvas.height = FIELD_HEIGHT;

		for (let s of this.props.sqPool.pool) {
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
				(s.pos.y + (s.size.h / 2)) * CELL_SIZE + 1 // 1 — vertical align correction
      );
    }

    this.fieldLayerSquares = new Image();
    this.fieldLayerSquares.src = ctx.canvas.toDataURL('image/png');
  }

  update = () => {
    if (this.isNeedRedraw) {
      this.isNeedRedraw = false;

      const ctx = this.field.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      this.fieldLayerGrid !== null && ctx.drawImage(
        this.fieldLayerGrid,
        this.fieldOffsetX, this.fieldOffsetY,
        ctx.canvas.width, ctx.canvas.height,
        0, 0, ctx.canvas.width, ctx.canvas.height
      );

      this.fieldLayerSquares !== null && ctx.drawImage(
        this.fieldLayerSquares,
        this.fieldOffsetX, this.fieldOffsetY,
        ctx.canvas.width, ctx.canvas.height,
        0, 0, ctx.canvas.width, ctx.canvas.height
      );
    }

    this.RAFHandle = requestAnimationFrame(this.update);
  }

  render() {
		return (
      <canvas
        id='field'
        className={ styles.field }
        onMouseMove={ this.onMouseMove }
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