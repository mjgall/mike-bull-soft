import { combineReducers } from 'redux';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload || false;
    default:
      return state;
  }
};

const initialAppState = {
  courses: []
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return { courses: action.payload } || false;
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] } || false;
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  app: appReducer
});
