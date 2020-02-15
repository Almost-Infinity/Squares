import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Routes from './routes';
import reducers from './reducers';
import initialState from './reducers/initialState';
import ErrorBoundary from 'Components/ErrorBoundary';

import 'Styles/main.sass';

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(thunk),
		DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
	)
);

render(
	<Provider store={store}>
		<ErrorBoundary>
			<Routes />
		</ErrorBoundary>
	</Provider>,
	document.getElementById('squares')
);