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
