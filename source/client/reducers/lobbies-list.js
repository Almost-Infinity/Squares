import {
  REQUEST_LOBBIES,
  RECEIVE_LOBBIES,
  RECEIVE_FAILED
} from 'Actions/lobbies-list';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOBBIES: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_LOBBIES: {
      return Object.assign({}, state, {
        isFetching: false,
        list: action.list
      });
    }
    case RECEIVE_FAILED: {
      return Object.assign({}, state, {
        isFetching: false,
        fetchingError: action.err
      });
    }
    default: {
      return state;
    }
  }
};