import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import initialState from './reducers/initial-state';
import ErrorBoundary from 'Components/ErrorBoundary';
import Routes from './routes';
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