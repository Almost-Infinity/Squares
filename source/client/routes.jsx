import React        from 'react';
import { Switch }   from 'react-router-dom';
import RouteEx      from 'Components/RouteEx';
import Header       from 'Components/Header';
import Lobbies      from 'Components/lobbies-list';
import Field        from 'Components/Field';

const WrapperRoute = ({ ...rest }) => (
  <main>
    <RouteEx { ...rest } />
  </main>
);

export const routes = (
  <React.Fragment>
    <Header />
    <Switch>
      <WrapperRoute path='/' title='Список лобби' component={ Lobbies } exact />
      <WrapperRoute path='/top' title='Лучшие игроки' />
      <WrapperRoute path='/blog' title='Блог' />
      <WrapperRoute path='/auth' title='Авторизация' />
      <RouteEx path='/play' title='<Название лобби>' component={ Field } />
    </Switch>
  </React.Fragment>
);