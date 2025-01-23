import axios from 'axios';

// Get base URL from environment variables

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add an interceptor to include JWT in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
