import React from 'react';

import { useWindowSize } from 'Hooks';
import Field from 'Components/Field';

export default function Game() {
  return <Field {...useWindowSize()}/>;
}