import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { routeExType } from 'Types/props';

const RouteWrap = (Component, props) => <Component {...props} />;

function RouteEx ({ title = '', component, ...routeProps }) {
  useEffect(() => {
    document.title = `Squares${title && ` — ${title}`}`;
  }, [ title ]);

  return <Route render={(props) => RouteWrap(component, props)} {...routeProps} />;
}

RouteEx.propTypes = routeExType;
export default RouteEx;