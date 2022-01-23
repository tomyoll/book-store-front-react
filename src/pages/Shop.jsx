import React, { useContext, useEffect, useState } from 'react';
import {
  Alert, Col, Container, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import DomainBar from '../components/DomainBar';
import BookList from '../components/BookList';
import Context from '../Context';
import { fetchBooks, fetchDomains } from '../API/BookAPI';
import Pages from '../components/Pages';
import { fetchWishList } from '../API/UserAPI';

const Shop = observer(() => {
  const { book } = useContext(Context);
  const { user } = useContext(Context);
  const [serverError, setServerError] = useState('');
  useEffect(() => {
    fetchDomains().then((data) => {
      if (data.status === 'FAIL') {
        return setServerError(data.message);
      }
      return book.setDomains(data.message);
    });
  }, []);

  useEffect(() => {
    fetchBooks(book.selectedDomain._id, book.page, book.limit).then((data) => {
      if (data.status === 'FAIL') {
        return setServerError(data.message);
      }
      book.setTotalCount(data.message.count);
      return book.setBooks(data.message.books);
    });
  }, [book.page, book.selectedDomain]);

  useEffect(() => {
    if (user.isAuth) {
      fetchWishList(user.user._id).then((res) => {
        if (!res.message) {
          user.setWishList([]);
        } else {
          user.setWishList(res.message.books);
        }
      });
    }
  }, [user.isAuth]);

  return (
    <Container fluid>
      {serverError.length > 0
      && <Alert>{serverError}</Alert>}
      <Row className="mt-2">
        <Col md={3}>
          <DomainBar />
        </Col>
        <Col md={9}>
          <BookList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
