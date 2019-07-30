import { combineReducers } from 'redux';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload || false;
    case 'FETCH_COURSES':
      return action.payload || false;
    default:
      return state;
  }
};

const appReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return action.payload || false;
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  app: appReducer
});
