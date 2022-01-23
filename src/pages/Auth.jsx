import React, { useContext, useState } from 'react';
import {
  Alert,
  Button, Card, Container, Form, Row,
} from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/Constants';
import { login, registration } from '../API/UserAPI';
import Context from '../Context';

const { REQUEST_RESPONSES } = require('../utils/Constants');

const Auth = observer(() => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useContext(Context);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseError, setResponseError] = useState({ errors: [] });

  // eslint-disable-next-line consistent-return
  const click = async () => {
    if (email && password) {
      let response;
      if (isLogin) {
        response = await login(email, password);
      } else {
        response = await registration(email, password);
      }
      if (response.status === REQUEST_RESPONSES.FAIL) {
        return setResponseError({ errors: response.errors });
      }
      user.setIsAuth(true);
      user.setUser(response.message.user);
      return history.push(SHOP_ROUTE);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ height: window.innerHeight - 54 }}>
      {responseError.errors.map((error) => (
        <Alert variant="danger" style={{ minWidth: '40%' }}>{error}</Alert>
      ))}
      <Card style={{ minWidth: '40%' }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form>
          <Form.Control
            className="m-3"
            placeholder="Введите email пользователя"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="m-3"
            placeholder="Введите пароль пользователя"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="d-flex flex-nowrap justify-content-between">
            {isLogin
              ? (
                <div style={{ width: 'auto' }}>
                  <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                </div>
              )
              : (
                <div style={{ width: 'auto' }}>
                  <NavLink to={LOGIN_ROUTE}>Есть аккаунт?</NavLink>
                </div>
              )}
            <Button style={{ width: 'auto' }} variant="outline-success" onClick={click}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>

    </Container>
  );
});

export default Auth;
