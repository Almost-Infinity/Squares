import React from 'react';
import { Switch } from 'react-router-dom';

import RouteEx from 'Components/routing';
import Lobbies from 'Components/lobbies-list';
import Game from 'Components/game';

export const routes = (
  <Switch>
    <RouteEx path='/' title='Список лобби' component={Lobbies} exact />
    <RouteEx path='/play' title='<Название лобби>' component={Game} />
    <RouteEx path='/top' title='Лучшие игроки' />
    <RouteEx path='/blog' title='Блог' />
    <RouteEx path='/auth' title='Авторизация' />
  </Switch>
);