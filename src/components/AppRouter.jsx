import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/Constants';
import Context from '../Context';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Switch>
      {user.isAuth && authRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
