import axios from 'axios';

// Create an Axios instance pointing to the API
const api = axios.create({
  baseURL: 'https://ctc-14efa787b23a.herokuapp.com/api',
  withCredentials: false, // Changed to false for CORS compatibility
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Axios interceptors if needed
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access globally (e.g., clear localStorage, redirect to login)
      localStorage.removeItem('userInfo');
    }
    return Promise.reject(error);
  }
);

export default api;