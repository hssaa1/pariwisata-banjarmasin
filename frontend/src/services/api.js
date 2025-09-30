import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor untuk logging
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const wisataAPI = {
  getAll: () => api.get('/wisata'),
  getById: (id) => api.get(`/wisata/${id}`),
  create: (data) => api.post('/wisata', data),
};

export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
};

export const kulinerAPI = {
  getAll: () => api.get('/kuliner'),
  getById: (id) => api.get(`/kuliner/${id}`),
};

// ✅ TAMBAHKIN INI - PEMESANAN API
export const pemesananAPI = {
  create: (data) => api.post('/pemesanan', data),
  getAll: () => api.get('/pemesanan'),
  getById: (id) => api.get(`/pemesanan/${id}`),
  updateStatus: (id, status) => api.put(`/pemesanan/${id}/status`, { status }),
};

export default api;