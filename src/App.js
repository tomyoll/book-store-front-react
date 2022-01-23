import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import AppRouter from './components/AppRouter';
import NavigationBar from './components/NavigationBar';
import Context from './Context';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.checkAuth().finally(() => setLoading(false));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
