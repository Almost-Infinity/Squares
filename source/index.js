import { createElement } from 'react';
import { render } from 'react-dom';
import App from './components/app';

const rootElement = document.getElementById('squares');
if (rootElement === null) {
	throw new Error('No root element!');
}

render(createElement(App), rootElement);