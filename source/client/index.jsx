import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes';
import reducers from './reducers';
import initialState from './reducers/initialState';

import ErrorBoundary from 'Components/ErrorBoundary';

import './sass/main.sass';

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(thunk),
		DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
	)
);

render(
	<Provider store={store}>
		<ErrorBoundary>
			<Router>
				{routes}
			</Router>
		</ErrorBoundary>
	</Provider>,
	document.getElementById('squares')
);