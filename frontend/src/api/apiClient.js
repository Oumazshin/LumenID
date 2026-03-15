import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lumen_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Handle specific status codes
    if (error.response?.status === 401) {
      // Unauthorized: Logout user or redirect to login
      localStorage.removeItem('lumen_auth_token');
      // window.location.href = '/auth/customer/login';
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
