import React from 'react';
import { shallow } from 'enzyme';
import { describe, it, expect } from 'jest';

import Square from '../components/squares-field/square';

describe('Square component', () => {
	it('props validation', () => {
		const props = {
			width: 128,
			height: 64,
			color: '#eee'
		};
		const wrapper = shallow(<Square { ...props }/>);
		expect(wrapper.prop('width')).toBe('128');
		expect(wrapper.prop('height')).toBe('64');
		expect(wrapper.find('rect').prop('stroke')).toBe('#eee');
	});
});