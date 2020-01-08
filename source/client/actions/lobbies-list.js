import axios from 'axios';

import {
  REQUEST_LOBBIES,
  RECEIVE_LOBBIES,
  RECEIVE_FAILED
} from 'Types/actions';

const requestLobbies = () => ({
  type: REQUEST_LOBBIES
});

const receiveLobbies = (list) => ({
  type: RECEIVE_LOBBIES,
  list
});

const receiveFailed = (err) => ({
  type: RECEIVE_FAILED,
  err
});

export const fetchLobbies = () => {
  return (dispatch) => {
    dispatch(requestLobbies());
    return axios.get('https://api.myjson.com/bins/12iq15')
      .then((res) => dispatch(receiveLobbies(res.data.lobbies)))
      .catch((err) => dispatch(receiveFailed(err)));
  };
};

/*
{
  "status": 200,
  "lobbies": [
    { "id": 0, "name": "Lobby #1", "members": 4, "private": true },
    { "id": 1, "name": "Top lobby 4ever", "members": 3, "private": false },
    {	"id": 2, "name": "Fun!", "members": 1, "private": false },
    { "id": 3, "name": "Oh my", "members": 2, "private": true },
    { "id": 4, "name": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Loremm", "members": 5, "private": false }
  ]
}
*/