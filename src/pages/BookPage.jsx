import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneBook } from '../API/BookAPI';
import BookInfo from '../components/BookInfo';

function BookPage() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchOneBook(id).then((data) => setBook(data.message));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image width={350} height={400} src={`${process.env.REACT_APP_API_URL}/${book.image}`} />
        </Col>
        <Col md={3} style={{ marginRight: 50 }}>
          <Card style={{ border: 'none' }}>
            <h3>{book.price} грн.</h3>
            <Button variant="outline-dark">Добавить в список избранного</Button>
          </Card>
        </Col>
        <Col md={4}>
          <BookInfo book={book} />
        </Col>
      </Row>
      <h1 className="mt-5">Анотация</h1>
      <p>{book.description}</p>
    </Container>
  );
}

export default BookPage;
