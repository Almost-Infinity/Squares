import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from 'Components/Header';
import LobbiesList from 'Components/LobbiesList';
import { Game } from 'Components/Game';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/play' component={Game}/>
			<Route path='/'>
				<Header />
				<main>
					<Route path='/' component={LobbiesList} exact/>
					<Route path='/top'/>
					<Route path='/faq'/>
					<Route path='/auth'/>
				</main>
			</Route>
		</Switch>
	</BrowserRouter>
);

export default Routes;
