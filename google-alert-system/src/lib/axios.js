import axios from 'axios';

const createApi = (accessToken) => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('🔒 Authentication error:', error.response.data);
        }
      
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createApi;
