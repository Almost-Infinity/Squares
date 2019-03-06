import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import Header from '../components/header';

describe('App component', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<App />).contains(<Header toggleAuthModal={() => {}} />)).toBe(true);
	});
});