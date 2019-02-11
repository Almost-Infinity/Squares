import React, { Component } from 'react';
import Square from './square';
import './styles.sass';

class SquaresField extends Component {
	render() {
		return (
			<div className="squares-field">
				<Square width={128} height={128} color="#333" />
				<Square width={64} height={64} color="#387" />
				<Square width={150} height={80} color="#528" />
				<Square width={30} height={80} color="#492" />
				<Square width={56} height={92} color="#333" />
				<Square width={20} height={20} color="#123" />
			</div>
		);
	}
}

export default SquaresField;