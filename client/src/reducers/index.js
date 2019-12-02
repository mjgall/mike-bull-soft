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
  lessons: [],
  symbolsTable: [],
  symbol: {},
  symbolImages: [],
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
    case 'DELETE_COURSE':
      return { ...state, coursesTable:  [
        ...state.coursesTable.slice(0, action.payload.index),
        ...state.coursesTable.slice(action.payload.index + 1)
    ]}
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
      return { ...state, symbolsTable: [], symbol: {} } || false;
    case 'TOGGLE_MODE':
      return (
        { ...state, creatorMode: state.creatorMode ? false : true } || false
      );
    case 'ADD_SYMBOL_IMAGE':
      return {
        ...state,
        symbolImages: [...state.symbolImages, action.payload]
      };
    case 'CLEAR_SYMBOL_IMAGES':
      return { ...state, symbolImages: [] };
    case 'SET_STUDENT_MODE':
      return { ...state, creatorMode: false };
    case 'SET_CREATOR_MODE':
      return { ...state, creatorMode: true };
    case 'GET_STARTED_COURSES':
      return {...state, startedCourses: action.payload}
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  forms: combineForms(
    { course: { language: 'english', difficulty: 'novice' }, symbol: {}, lesson: {} },
    'forms'
  )
});
