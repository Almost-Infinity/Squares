import React        from 'react';
import { Switch }   from 'react-router-dom';
import RouteEx      from 'Components/RouteEx';
import Header       from 'Components/Header';
import Lobbies      from 'Components/LobbiesList';
import Field        from 'Components/Field';

const WrappedRoute = ({ ...rest }) => (
  <main>
    <RouteEx { ...rest } />
  </main>
);

export const routes = (
  <React.Fragment>
    <Header />
    <Switch>
      <WrappedRoute path='/' title='Список лобби' component={Lobbies} exact />
      <WrappedRoute path='/top' title='Лучшие игроки' />
      <WrappedRoute path='/blog' title='Блог' />
      <WrappedRoute path='/auth' title='Авторизация' />
      <RouteEx path='/play' title='<Название лобби>' component={Field} />
    </Switch>
  </React.Fragment>
);