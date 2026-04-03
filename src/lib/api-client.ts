import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_API_URL;

export const serverAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});