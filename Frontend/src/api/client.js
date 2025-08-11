import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const getAuthToken = () => localStorage.getItem('auth_token') || '';
export const setAuthToken = (token) => localStorage.setItem('auth_token', token || '');
export const clearAuthToken = () => localStorage.removeItem('auth_token');

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;