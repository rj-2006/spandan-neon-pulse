import axios from 'axios';

import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (data: Record<string, unknown>) => {
    return apiClient.post('/auth/login', data);
  },
  register: async (data: Record<string, unknown>) => {
    return apiClient.post('/auth/register', data);
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  },
  refresh: async () => {
    return apiClient.post('/auth/refresh');
  },
  verifyEmail: async (code: string) => {
    return apiClient.get(`/auth/verify-email?code=${code}`);
  },
  googleAuth: () => {
    // baseURL is e.g. "http://localhost:5000" — navigate directly to the OAuth start route
    const base = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
    window.location.href = `${base}/auth/google`;
  },
  exchangeCode: async (code: string) => {
    return apiClient.post('/auth/exchange-code', { code });
  },
};

export const eventsAPI = {
  registerParticipant: async (data: Record<string, unknown>) => {
    return apiClient.post('/participant/register', data);
  }
};
