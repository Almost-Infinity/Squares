import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import style from './sass/main.sass';

const App = () => (
	<React.Fragment>
		<Header />
		<div className={ style.content }>
			<BrowserRouter>
				<Switch>
					<Route exact path="/"></Route>
					<Route exact path="/top"></Route>
					<Route exact path="/blog"></Route>
				</Switch>
			</BrowserRouter>
		</div>
	</React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('squares'));