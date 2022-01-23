import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import BookStore from './store/BookStore';
import Context from './Context';

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      book: new BookStore(),
    }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
