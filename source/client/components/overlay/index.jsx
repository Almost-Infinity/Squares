import React from 'react';
import PropTypes from 'prop-types';

import style from './styles.sass';

Overlay.propTypes = {
  children: PropTypes.func
};

export default function Overlay({ children }) {
  return (
    <div className={ style.overlayBackground }>
      <div className={ style.overlayContainer }>
        { children }
      </div>
    </div>
  );
}