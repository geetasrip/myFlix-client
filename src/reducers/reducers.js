import { combineReducers } from "redux";

import {
  SET_MOVIES,
  SET_FILTER,
  SET_USER,
  UPDATE_USER
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log("reducer value", typeof action.value);
      return action.value;
    default:
      return state;
  }
}

function loggedInUser(state = "", action) {
  switch (action.type) {
    case SET_USER:
      console.log("loggedin user");
      return action.value;
    case UPDATE_USER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  loggedInUser
});

export default moviesApp;
