import axios from 'axios';
import { apiTypes } from '../constants/apiTypes';

const axiosInstance = axios.create({
  baseURL: apiTypes.URL_MAIN,
  withCredentials: true,
});

export default axiosInstance;
