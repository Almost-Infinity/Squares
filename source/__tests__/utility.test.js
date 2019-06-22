import * as U from '../utility';

/* eslint-disable no-undef*/
describe('utility.js', () => {
  let div = global.document.createElement('div');
  div.className = 'class1 some_class another-class';

  it('hasClass', () => {
		expect(U.hasClass(div, 'some_class')).toBe(true);
  });

	it('addClass', () => {
    U.addClass(div, 'testClass');
		expect(div.className).toBe('class1 some_class another-class testClass');
  });

  it('addClass | class exists', () => {
		expect(U.addClass(div, 'some_class')).toBe(false);
  });
  
  it('removeClass', () => {
    U.removeClass(div, 'another-class');
		expect(div.className).toBe('class1 some_class testClass');
  });
  
  it('removeClass | class no exists', () => {
		expect(U.removeClass(div, 'no-exists-class')).toBe(false);
	});
});