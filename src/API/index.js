import axios from 'axios';
import requestErrorsHandler from '../utils/RequestErrorHandler';

const host = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use((config) => config, async (err) => {
  const originalRequest = err.config;
  if (err.request) throw err;
  if (err.response.status === 401 && err.config && !err.config && !err.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return authHost.request(originalRequest);
    } catch (e) {
      requestErrorsHandler(e);
    }
  }
  throw err;
});

export {
  host,
  authHost,
};
