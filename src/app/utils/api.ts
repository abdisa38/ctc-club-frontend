import axios from 'axios';

// Create an Axios instance pointing to the API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Enable credentials to send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Axios interceptors if needed
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    
    // Add JWT token from localStorage to Authorization header
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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
      localStorage.removeItem('jwt_token');
    }
    return Promise.reject(error);
  }
);

export default api;