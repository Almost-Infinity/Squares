import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { useKeyboard } from 'Hooks';
import { squaresPoolAdd } from 'Actions';
import { Field } from 'Components/Field';
import { TabList } from 'Components/TabList';

function Game({ game, squaresPoolAdd }) {
  const [ isTablistShown, toggleTablist ] = useState(false);

  useKeyboard((kbMap) => {
    toggleTablist(kbMap.Tab);
  });

  return (
    <React.Fragment>
      <Field blured={isTablistShown} squaresPool={game.squaresPool} squaresPoolAdd={squaresPoolAdd}/>
      {isTablistShown && <TabList />}
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