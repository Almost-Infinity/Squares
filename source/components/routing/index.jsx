import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

RouteEx.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  title: PropTypes.string
};

const RouteWrap = (Component, props) => <Component {...props} />;

export default function RouteEx ({ title = '', component, ...routeProps }) {
  useEffect(() => {
    document.title = `Squares${title && ` — ${title}`}`;
  }, [ title ]);

  return <Route render={(props) => RouteWrap(component, props)} {...routeProps} />;
}