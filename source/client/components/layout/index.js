import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';

import styles from './styles.sass';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <main className={ `${styles.layout} clearfix` }>{ props.children }</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;