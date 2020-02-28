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

export const deleteSymbol = async symbolId => {
  // const response = await axios.delete(`/api/symbols/${symbolId}`);
  const response = {
    data: {
      success: true,
      error: false
    }
  };
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
  const response = await axios.post(`/api/users_courses`, { userId, courseId });
  return response.data;
};

export const getStudentLesson = async (lessonId, userId) => {
  const response = await axios.get(`/api/lessons/${lessonId}/users/${userId}`);
  console.log(response);
  return response.data;
};

//this shouldn't be called anywhere

// export const fetchRandomImages = async count => {
//   const response = await axios.get(`/api/randomImages/${count}`);
//   return response.data;
// };

// export const fetchImages = async count => {
//   const response = await axios.get(`/api/phase/images`);
//   return response.data;
// };

export const createChallenge = async (lessonId, symbolId) => {
  try {
    const response = await axios.post(`/api/challenges`, {
      lessonId,
      symbolId
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAccount = async userId => {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLogins = async userId => {
  try {
    const response = await axios.get(`/api/logins/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (email, domain) => {
  try {
    const response = await axios.post('/auth/reset', { email, domain });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const submitNewPassword = async (
  token,
  password,
  userId,
  currentPassword
) => {
  try {
    if (token) {
      const response = await axios.post('/auth/resetpassword', {
        token,
        password,
        userId
      });
      return response.data;
    } else if (currentPassword) {
      const response = await axios.post('/auth/resetpassword', {
        currentPassword,
        password,
        userId
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const checkToken = async token => {
  try {
    const response = await axios.post('/auth/checktoken', { token });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchChallengesByLesson = async (lessonId, userId) => {
  try {
    const response = await axios.get(
      `/api/users/${userId}/lessons/${lessonId}/challenges`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createChallengesByLesson = async (lessonId, userId) => {
  try {
    const response = await axios.post(`/api/lessons/challenges`, {
      lessonId,
      userId
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLastCompletedChallenge = async (userId, lessonId) => {
  try {
    const response = await axios.post(`/api/lessons/lastchallenge`, {
      userId,
      lessonId
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const submitAnswer = async (challengeId, imageId) => {
  try {
    const response = await axios.get(
      `/api/challenges/${challengeId}/checkanswer/${imageId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const changeChallengeStatus = async (challengeId, newStatus) => {
  try {
    const response = await axios.put(`/api/challenges`, {
      challengeId,
      newStatus
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
