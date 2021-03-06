import axios from 'axios';
import {actions} from 'react-redux-form'


export const resetForm = (model, initialState = {}) => dispatch => {
  dispatch(actions.change(model, initialState))
}

//FETCH USER - CALLED IN HOME COMPONENT TO GET CURRENT USER ACROSS APP
export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  });
  return response.data;
};

export const fetchCourses = () => async dispatch => {
  const response = await axios.get('/api/courses');
  dispatch({
    type: 'FETCH_COURSES',
    payload: response.data
  });
  return response.data;
};

export const fetchAllCourses = () => async dispatch => {
  const response = await axios.get('/api/allcourses');
  dispatch({
    type: 'FETCH_ALL_COURSES',
    payload: response.data
  });
  return response.data;
};

export const fetchSymbols = course_id => async dispatch => {
  const response = await axios.get(`/api/symbols/${course_id}`);

  dispatch({
    type: 'FETCH_SYMBOLS',
    payload: response.data
  });
  return response.data;
};

export const textToSpeech = () => async dispatch => {
  const response = await axios.post('/api/texttospeech', {
    text: `${new Date(Date.now()).toString()}`,
  });
  dispatch({
    type: 'TEXT_TO_SPEECH',
    payload: response.data
  });
  return response.data;
};

export const addCourse = course => async dispatch => {
  const response = await axios.post('/api/courses', {
    title: course.title,
    language: course.language,
    description: course.description,
    difficulty: course.difficulty,
    owner_id: course.owner_id
  });

  dispatch({
    type: 'ADD_COURSE',
    payload: response.data
  });
  return response.data;
};

export const getCourse = id => async dispatch => {
  const response = await axios.post('/api/course', {
    id: id
  });
  dispatch({
    type: 'GET_COURSE',
    payload: response.data
  });
  // return response.data;
};

export const deleteCourse = (id, index) => async dispatch => {
  const response = await axios.delete(`/api/course/${id}`);
  dispatch({
    type: 'DELETE_COURSE',
    payload: {...response.data, id, index}
  });
  return response.data;
};

export const clearCourse = () => async dispatch => {
  dispatch({
    type: 'CLEAR_COURSE',
    payload: null
  });
};

export const addSymbol = symbol => async dispatch => {

  const response = await axios.post('/api/symbols', {
    owner_id: symbol.owner_id,
    course_id: symbol.course_id,
    text: symbol.text,
    audio_url: symbol.audio_url,
    language: symbol.language,
    images: symbol.images
  });
  dispatch({
    type: 'ADD_SYMBOL',
    payload: response.data
  });
  return response.data;
};

export const getSymbol = id => async dispatch => {
  const response = await axios.get(`/api/symbol/${id}`);
  dispatch({
    type: 'GET_SYMBOL',
    payload: response.data
  });
  return response.data;
};

export const fetchStartedCourses = userId => async dispatch => {

  const response = await axios.get(`/api/users_courses/${userId}`);
  dispatch({
    type: 'GET_STARTED_COURSES',
    payload: response.data.response
  });
  return response.data.response;
};

export const clearSymbol = () => async dispatch => {
  dispatch({
    type: 'CLEAR_SYMBOL',
    payload: null
  });
};

export const switchMode = () => {
  return {
    type: 'TOGGLE_MODE',
    payload: null
  };
};

export const setCreatorMode = () => {
  return {
    type: 'SET_CREATOR_MODE',
    payload: null
  }
}

export const setStudentMode = () => {
  return {
    type: 'SET_STUDENT_MODE',
    payload: null
  }
}

export const addSymbolImage = (imageData) => {
 return {
   type: 'ADD_SYMBOL_IMAGE',
   payload: imageData
 }
}

export const clearSymbolImages = () => {
  return {
    type: 'CLEAR_SYMBOL_IMAGES',
    payload: null
  }
}

export const editCourse = course => async dispatch => {
  const response = await axios.put('/api/course', course);
  dispatch({
    type: 'EDIT_COURSE',
    payload: response.data
  })
}
