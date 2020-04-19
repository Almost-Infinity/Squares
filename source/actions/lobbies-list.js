import {
  REQUEST_LOBBIES,
  RECEIVE_LOBBIES,
  RECEIVE_FAILED
} from 'Actions/action-types';

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
  return async (dispatch) => {
    dispatch(requestLobbies());

    let res = await fetch('http://localhost:8080/api/lobbies');
    if (!res.ok) {
      dispatch(receiveFailed(res));
      console.error('Couldn\'t get lobbies from API', res);
      return;
    }

    let json = await res.json();
    dispatch(receiveLobbies(json.lobbies));
  };
};

/*
{
  "status": 200,
  "lobbies": [
    { "id": 0, "name": "Lobby #1", "members": 4, "isPrivate": true },
    { "id": 1, "name": "Top lobby 4ever", "members": 3, "isPrivate": false },
    { "id": 2, "name": "Fun!", "members": 1, "isPrivate": false },
    { "id": 3, "name": "Oh my", "members": 2, "isPrivate": true },
    { "id": 4, "name": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Loremm", "members": 5, "isPrivate": false },
    { "id": 5, "name": "Все сюда!", "members": 1, "isPrivate": false },
    { "id": 6, "name": "Empty lobby", "members": 0, "isPrivate": false }
  ]
}
*/