import axios from 'axios';

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

export const textToSpeech = () => async dispatch => {
  const response = await axios.post('/api/texttospeech', {
    text: 'Hello world'
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
    owner_id: course.owner_id
  });
  dispatch({
    type: 'ADD_COURSE',
    payload: response.data
  });
  return response.data;
};

export const getCourse = id => async dispatch => {
  console.log(id);
  const response = await axios.post('/api/course', {
    id: id
  });
  dispatch({
    type: 'GET_COURSE',
    payload: response.data
  });
  return response.data;
};

export const clearCourse = () => async dispatch => {
  dispatch({
    type: 'CLEAR_COURSE',
    payload: null
  });
};
