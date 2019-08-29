import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';

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
  coursesTableStudent: [],
  course: {},
  symbolsTable: [],
  symbol: {},
  creatorMode: false
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return { ...state, coursesTable: action.payload } || false;
    case 'FETCH_ALL_COURSES':
      return { ...state, coursesTableStudent: action.payload } || false;
    case 'ADD_COURSE':
      return (
        { ...state, coursesTable: [...state.coursesTable, action.payload] } ||
        false
      );
    case 'GET_COURSE':
      return { ...state, course: action.payload } || false;
    case 'CLEAR_COURSE':
      return { ...state, course: action.payload } || false;
    case 'FETCH_SYMBOLS':
      return { ...state, symbolsTable: action.payload } || false;
    case 'ADD_SYMBOL':
      return (
        { ...state, symbolsTable: [...state.symbolsTable, action.payload] } ||
        false
      );
    case 'GET_SYMBOL':
      return { ...state, symbol: action.payload } || false;
    case 'CLEAR_SYMBOL':
      return { ...state, symbolsTable: [] } || false;
    case 'TOGGLE_MODE':
      return (
        { ...state, creatorMode: state.creatorMode ? false : true } || false
      );
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  forms: combineForms(
    { course: { language: 'english', difficulty: 'novice' }, symbol: {} },
    'forms'
  )
});
