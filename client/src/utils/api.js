import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const checkServerStatus = async () => {
  try {
    await fetch(`${API_URL}/health-check`, { method: 'HEAD' });
    return true;
  } catch {
    return false;
  }
};

const API = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true
});

API.interceptors.request.use(async (config) => {
  const isServerAvailable = await checkServerStatus();
  if (!isServerAvailable) {
    throw new Error('Server is not accessible. Please check if the server is running.');
  }
  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Server connection error:', error);
      error.message = 'Cannot connect to server. Please check if the server is running.';
    }
    return Promise.reject(error);
  }
);

export default API;
