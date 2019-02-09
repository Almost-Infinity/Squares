import React, { Component } from 'react';
import SquaresField from '../squares-field';
import './styles.sass';

class Game extends Component {
	render() {
		return (
			<div className="game-layout">
				<SquaresField />
			</div>
		);
	}
}

export default Game;