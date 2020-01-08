import React from 'react';
import { iconType } from 'Types/props';

import iconSprite from 'Icons/icon-sprite.svg';

const Icon = ({ width, height, type, className, style }, props) => {
  return (
    <svg width={width} height={height} className={className} style={style} aria-hidden='true' focusable='false' {...props}>
      <use xlinkHref={`${iconSprite}#${type}`}></use>
    </svg>
  );
};

Icon.propTypes = iconType;

export default Icon;