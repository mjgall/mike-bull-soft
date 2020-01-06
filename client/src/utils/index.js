import axios from 'axios';

export const fetchCourse = async (id, userId) => {
  const response = await axios.post('/api/course', {
    id: id,
    userId: userId
  });
  return response.data;
};

export const fetchLesson = async id => {
  const response = await axios.get(`/api/lesson/${id}`);
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

  const response = await axios.put('/api/course', course);
  return response.data;
};

export const addLesson = async lesson => {

  const response = await axios.post('/api/lessons', { lesson });
  return response.data;
};

export const deleteLesson = async lessonId => {

  const response = await axios.delete(`/api/lessons/${lessonId}`);
  return response.data;
};

export const startCourse = async (userId, courseId) => {

  const response = await axios.post(`/api/users_courses`, { userId, courseId })
  return response.data
}

export const fetchRandomImages = async (count) => {
  const response = await axios.get(`/api/randomImages/${count}`)
  return response.data
}

export const createChallenge = async (lessonId, symbolId) => {
  try {
    const response = await axios.post(`/api/challenges`, {lessonId, symbolId})
    return response.data
  } catch (error) {
    console.log(error)
  }

}
