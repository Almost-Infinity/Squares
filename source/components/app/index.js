import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../header';
import Lobbies from '../lobbies-list';
import Game from '../../containers/game';
import style from './styles.sass';

export default function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Header />
				<div className={style.content}>	
					<Switch>
						<Route path="/main" exact component={Lobbies}></Route>
						<Route path="/" exact component={Game}></Route>
						<Route path="/top"></Route>
						<Route path="/blog"></Route>
						<Route path="/auth"></Route>
					</Switch>
				</div>
			</React.Fragment>
		</BrowserRouter>
	);
}