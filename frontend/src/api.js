import axios from 'axios';

// Create an Axios instance with baseURL
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// State to manage token refreshing
let isRefreshing = false;
let failedQueue = [];

// Process the request queue after refreshing the token
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to attach the token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle token expiration and refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the response is a 401 (Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      // Set retry flag and begin token refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        // Request new access token using the refresh token
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        const { access: newAccessToken } = response.data;

        // Store new access token
        localStorage.setItem('access', newAccessToken);
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';  // Redirect to login on token failure
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// Public API Client for registration and login (no authentication needed)
const publicApiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API to fetch all sectors
export const fetchSectors = async () => {
  try {
    const response = await apiClient.get('/sectors/');
    return response.data;
  } catch (error) {
    console.error('Error fetching sectors:', error.message);
    throw error;
  }
};

// API to fetch all countries
export const fetchCountries = async () => {
  try {
    const response = await apiClient.get('/countries/');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    throw error;
  }
};

// Function to register a user
export const registerUser = async (formData) => {
  try {
    const response = await publicApiClient.post('/register/', formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Registration error:', error.response.data);
    } else {
      console.error('Registration error:', error.message);
    }
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await publicApiClient.post('/login/', credentials);
    const { access, refresh } = response.data;

    // Store tokens in local storage
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    return { access, refresh };
  } catch (error) {
    if (error.response) {
      console.error('Login error:', error.response.data);
    } else {
      console.error('Login error:', error.message);
    }
    throw error;
  }
};

// Function to fetch the current user's profile
export const fetchProfile = async () => {
  try {
    const response = await apiClient.get('/profile/');
    return response.data;  // Return profile data
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
};

// Function to fetch a profile by ID
export const fetchProfileById = async (id) => {
  try {
    const response = await apiClient.get(`/profile/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile by ID:', error.message);
    throw error;
  }
};

// Function to update the user profile
export const updateProfile = async (id, profileData) => {
  try {
    const response = await apiClient.put(`/profile/${id}/`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};

// Function to delete the user profile
export const deleteProfile = async (id) => {
  try {
    const response = await apiClient.delete(`/profileview/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error.message);
    throw error;
  }
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  window.location.href = '/login';  // Optionally redirect to login
};

// Function to get the access token
export const getToken = () => localStorage.getItem('access');

export default apiClient;
