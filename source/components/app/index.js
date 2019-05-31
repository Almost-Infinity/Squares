import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../header';
import Lobbies from '../lobbies-list';
import Game from '../game';
import style from './styles.sass';

export default function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Header />
				<div className={ style.content }>	
					<Switch>
						<Route path="/" exact component={ Lobbies }></Route>
						<Route path="/play" component={ Game }></Route>
						<Route path="/top"></Route>
						<Route path="/blog"></Route>
					</Switch>
				</div>
			</React.Fragment>
		</BrowserRouter>
	);
}