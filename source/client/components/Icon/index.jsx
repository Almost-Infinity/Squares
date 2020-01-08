import React from 'react';
import { iconType } from 'Types/props';

import iconSprite from 'Icons/icon-sprite.svg';

const Icon = ({ width, height, type, className }, props) => {
  return (
    <svg width={width} height={height} className={className} ariaHidden='true' focusable='false' {...props}>
      <use xlinkHref={`${iconSprite}#${type}`}></use>
    </svg>
  );
};

Icon.propTypes = iconType;

export default Icon;