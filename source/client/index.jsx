import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { gameReducer } from './reducers/game';
import initialState from './reducers/initialState';

import Layout from 'Components/layout';

import { routes } from './routes';

import './sass/main.sass';

const rootElement = document.getElementById('squares');
if (rootElement === null) {
	throw new Error('No root element!');
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const store = createStore(
	gameReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
	)
);

render(
	<Provider store={store}>
		<BrowserRouter>
			<Layout>
				{ routes }
			</Layout>
		</BrowserRouter>
	</Provider>,
	rootElement
);