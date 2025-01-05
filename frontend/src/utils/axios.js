// Update axios instance to send token
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // Ensure your API base URL is correct
  withCredentials: true,  // Ensure cookies are sent with requests if you're using cookies
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');  // Get the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token in Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
