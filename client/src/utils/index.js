import axios from 'axios';

export const fetchCourse = async (id, userId) => {
  const response = await axios.post('/api/course', {
    id: id,
    userId: userId
  });
  return response.data;
};

export const fetchSymbols = async id => {
  const response = await axios.get(`/api/symbols/${id}`);
  return response.data;
};

export const fetchLessons = async course_id => {
  const response = await axios.get(`/api/lessons/${course_id}`);
  return response.data;
};

export const fetchSymbolsByLessons = async lessonId => {
  const response = await axios.get(`/api/symbolsbylesson/${lessonId}`);
  return response.data;
};

export const editCourse = async course => {
  console.log(course)
  const response = await axios.put('/api/course', course);
  return response.data;
  // dispatch({
  //   type: 'EDIT_COURSE',
  //   payload: response.data
  // })
};
