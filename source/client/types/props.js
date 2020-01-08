import { node, object, func, oneOfType, string } from 'prop-types';

export const errorBoundaryType = {
  children: node.isRequired
};

export const fieldType = {
	squaresPool: object.isRequired,
	addSquare: func.isRequired
};

export const lobbiesListType = {
  lobbies: object.isRequired,
	fetchLobbies: func.isRequired
};

export const routeExType = {
  component: oneOfType([
    object,
    func
  ]),
  title: string
};

export const iconType = {
  width: string,
  height: string,
  type: string.isRequired
};