import axios from 'axios'

export const fetchCourse = async (id) => {
  const response = await axios.post('/api/course', {
    id: id
  });
  return response.data;
}

export const fetchSymbols = async id => {
  const response = await axios.get(`/api/symbols/${id}`);
  return response.data;
}