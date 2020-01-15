import { node, object, func, oneOfType, string, bool, number } from 'prop-types';

export const errorBoundaryType = {
  children: node.isRequired
};

export const errorMessageType = {
  errorTitle: string.isRequired,
  errorText: string.isRequired,
  reloadBtn: bool
};

export const fieldType = {
	squaresPool: object.isRequired,
	addSquare: func.isRequired
};

// LobbiesList
export const lobbiesListType = {
  lobbies: object.isRequired,
	fetchLobbies: func.isRequired
};

export const lobbiesHeadType = {
  sortType: string,
  sortDir: bool,
  sortLobbiesList: func
};

export const lobbiesBodyType = {
  sortType: string,
  sortDir: bool
};

export const lobbyItemType = {
  id: number,
  name: string,
  members: number,
  isPrivate: bool
};

// Routes
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