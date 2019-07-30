import axios from 'axios';

//FETCH USER - CALLED IN HOME COMPONENT TO GET CURRENT USER ACROSS APP
export const fetchUser = () => async dispatch => {
  const response = await axios.get('api/current_user');
  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  });
  return response.data;
};

export const fetchCourses = () => async dispatch => {
  const response = await axios.get('api/courses');
  console.log(response.data)
  dispatch({
    type: 'FETCH_COURSES',
    payload: response.data
  });
  return response.data;
};