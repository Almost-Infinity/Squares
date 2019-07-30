import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { gameReducer } from './reducers/game';

import Layout from './components/layout';
import Game from './components/game';
import Lobbies from './components/lobbies-list';

import './sass/main.sass';

const rootElement = document.getElementById('squares');
if (rootElement === null) {
	throw new Error('No root element!');
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const store = createStore(
	gameReducer,
	DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
	<Provider store={store}>
		<Router>
			<Layout>
				<Route exact path='/' component={Lobbies} />
				<Route path="/play" render={() => <Game />} />
				<Route path="/top" />
				<Route path="/blog" />
				<Route path="/auth" />
			</Layout>
		</Router>
	</Provider>,
	rootElement
);