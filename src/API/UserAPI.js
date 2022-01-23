import axios from 'axios';
import { authHost, host } from './index';
import requestErrorsHandler from '../utils/RequestErrorHandler';

export const registration = async (email, password) => {
  try {
    const { data } = await authHost.post('/api/user/registration', { email, password });
    localStorage.setItem('token', data.message.accessToken);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await authHost.post('/api/user/login', { email, password });
    localStorage.setItem('token', data.message.accessToken);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const check = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/refresh`, { withCredentials: true });
  localStorage.setItem('token', data.message.accessToken);
  return data;
};

export const fetchWishList = async (user) => {
  try {
    const { data } = await host.get(`${process.env.REACT_APP_API_URL}/api/wish-list/get/${user}`);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const updateWishList = async (user, books) => {
  try {
    const { data } = await host.put(`${process.env.REACT_APP_API_URL}/api/wish-list/add/${user}`, {
      books,
    });
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};
