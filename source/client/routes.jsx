import React from 'react';
import { Switch } from 'react-router-dom';

import RouteEx from './components/routing';
import Lobbies from './components/lobbies-list';
import Game from './components/game';

export const routes = (
  <Switch>
    <RouteEx path='/' title='Список лобби' component={Lobbies} exact />
    <RouteEx path='/play' title='<Название лобби>' component={Game} />
    <RouteEx path='/top' title='Лучшие игроки' />
    <RouteEx path='/blog' title='Блог' />
    <RouteEx path='/auth' title='Авторизация' />
  </Switch>
);