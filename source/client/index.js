import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { gameReducer } from './reducers/game';

import Layout from './components/layout';

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
	DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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