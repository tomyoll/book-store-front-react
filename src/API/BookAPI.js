import { authHost, host } from './index';
import requestErrorsHandler from '../utils/RequestErrorHandler';

export const createBook = async (book) => {
  try {
    const { data } = await authHost.post('/api/book/create', book);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const editBook = async (book, id) => {
  try {
    const { data } = await authHost.put(`/api/book/edit/${id}`, book);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const editDomain = async (name, id) => {
  try {
    const { data } = await authHost.put(`/api/domain/edit/${id}`, { name });
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const createDomain = async ({ name }) => {
  try {
    const { data } = await authHost.post('/api/domain/create', { name });
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const fetchDomains = async () => {
  try {
    const { data } = await host.get('/api/domain/get');
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const fetchBooks = async (domainID, page, limit) => {
  try {
    const { data } = await host.get('/api/book/get', {
      params:
        {
          domainID,
          page,
          limit,
        },
    });
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const fetchOneBook = async (id) => {
  try {
    const { data } = await host.get(`/api/book/get-one/${id}`);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const fetchOneDomain = async (id) => {
  try {
    const { data } = await host.get(`/api/domain/get-one/${id}`);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const fetchBooksFromWishList = async (id) => {
  try {
    const { data } = await host.get(`/api/book/get-from-wish-list/${id}`);
    return data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
};

export const deleteBook = async (id) => {
  await authHost.delete(`/api/book/delete/${id}`);
};

export const deleteDomain = async (id) => authHost.delete(`/api/domain/delete/${id}`);
