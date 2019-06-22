import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { game } from './reducers';

import App from './components/app';

const rootElement = document.getElementById('squares');
if (rootElement === null) {
	throw new Error('No root element!');
}

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;


import { sqPoolAdd } from './actions';
window.addSq = (x, y, w, h, c) => {
	sqPoolAdd(x, y, w, h, c);
}


const store = createStore(
	game,
	DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);