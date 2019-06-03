import React from 'react';

function rect(props) {
	const {ctx, x, y, width, height} = props;
	ctx.fillRect(x, y, width, height);
}

export default class Game extends React.Component {
	constructor() {
		super();
		this.getField = React.createRef();

		this.updateCanvas = this.updateCanvas.bind(this);
	}

	componentDidUpdate() {
		this.updateCanvas();
	}

	updateCanvas() {
		const ctx = this.getField.current.getContext('2d');
		ctx.clearRect(0,0, 300,300);

		rect({ctx, x: 10, y: 10, width: 50, height: 50});
		rect({ctx, x: 110, y: 110, width: 50, height: 50});
	}

	componentDidMount() {
		document.title = 'Squares • <Lobbyname>';

		const parentWidth = this.getField.current.parentElement.innerWidth;
		this.getField.current.width = parentWidth;
		this.getField.current.height = parentWidth / (window.innerWidth / window.innerHeight);

		this.updateCanvas();
	}

	render() {
		return <canvas ref={ this.getField }></canvas>;
	}
}