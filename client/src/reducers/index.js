import { combineReducers } from 'redux';

const initialAuthState = null;

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload || false;
    default:
      return state;
  }
};

const initialAppState = {
  coursesTable: [],
  course: {}
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return { ...state, coursesTable: action.payload } || false;
    case 'ADD_COURSE':
      return (
        { ...state, coursesTable: [...state.coursesTable, action.payload] } ||
        false
      );
    case 'GET_COURSE':
      return { ...state, course: action.payload } || false;
    case 'CLEAR_COURSE':
      return { ...state, course: action.payload } || false;
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  app: appReducer
});
