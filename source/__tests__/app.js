import React from 'react';
import { shallow } from 'enzyme';

import App from '../components/app';
import Header from '../components/header';

/* eslint-disable no-undef*/
describe('App component', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<App />).contains(<Header />)).toBe(true);
	});
});