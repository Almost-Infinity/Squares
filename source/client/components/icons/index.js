import React from 'react';
import PropTypes from 'prop-types';

import { ICONS } from './icons';

const Icon = ({ name, width, height, fill, className }) => {
  const svgProps = { width, height, fill, className };

  return (
    <svg { ...svgProps } xmlns='http://www.w3.org/2000/svg' viewBox={ ICONS[name].viewBox }>
      <path d={ ICONS[name].path } />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  width: '20px',
  height: '20px',
  fill: '#444',
  className: undefined
};

export default Icon;