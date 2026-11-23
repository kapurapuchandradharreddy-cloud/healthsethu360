import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getSystemHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getSystemStatus = async () => {
  const response = await api.get('/system/status');
  return response.data;
};

export default api;
