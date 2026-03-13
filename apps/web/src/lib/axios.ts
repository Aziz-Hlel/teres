import ENV from '@/config/env.variables';
import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const Axios = createAxiosInstance();
