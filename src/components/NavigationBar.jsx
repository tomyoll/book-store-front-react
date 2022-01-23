import React, { useContext } from 'react';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Context from '../Context';
import {
  ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, WISH_LIST_ROUTE,
} from '../utils/Constants';

const NavigationBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-5">
      <Container fluid>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Book Store</NavLink>

        {user.isAuth
          ? (
            <Nav style={{ color: 'white' }}>
              <Button variant="outline-light" onClick={() => logout()}>Выйти</Button>
              <Button variant="outline-light" onClick={() => history.push(WISH_LIST_ROUTE)}>Список избранного</Button>
              {user.user.role === 'ADMIN'
                ? <Button style={{ marginLeft: 16 }} variant="outline-light" onClick={() => history.push(ADMIN_ROUTE)}>Панель администратора</Button>
                : null}
            </Nav>
          )
          : (
            <Nav style={{ color: 'white' }}>
              <Button
                variant="outline-light"
                onClick={() => {
                  history.push(LOGIN_ROUTE);
                }}
              >Авторизация
              </Button>
            </Nav>
          )}
      </Container>
    </Navbar>
  );
});

export default NavigationBar;
