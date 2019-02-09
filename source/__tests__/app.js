import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../App';
import Layout from '../components/layout';

describe('App component', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<App />).contains(<Layout />)).toBe(true);
	});
});