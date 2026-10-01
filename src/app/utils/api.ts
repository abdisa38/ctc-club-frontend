import axios from 'axios';

const getNormalizedApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL || 'https://abdisa38-ctc-club-backend.onrender.com/api';
  let cleanUrl = envUrl.trim().replace(/\/+$/, '');
  if (!cleanUrl.endsWith('/api')) {
    cleanUrl = `${cleanUrl}/api`;
  }
  return cleanUrl;
};

const API_BASE_URL = getNormalizedApiUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable credentials to send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Axios interceptors if needed
api.interceptors.request.use(
  (config) => {
    const formattedUrl = (config.baseURL?.replace(/\/+$/, '') || '') + '/' + (config.url?.replace(/^\/+/, '') || '');
    console.log('Making API request to:', formattedUrl);
    
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