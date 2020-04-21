import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { squaresPoolAdd } from 'Actions';
import { Field } from 'Components/Field';

function Game({ game, squaresPoolAdd }) {
  return (
    <React.Fragment>
      <Field squaresPool={game.squaresPool} squaresPoolAdd={squaresPoolAdd}/>
    </React.Fragment>
  );
}

Game.propTypes = {
  game: object,
  squaresPoolAdd: func
};

const mapStateToProps = (state) => ({ game: state.game });

const ConnectedGame = connect(
	mapStateToProps,
	{ squaresPoolAdd }
)(Game);

export { ConnectedGame as Game };