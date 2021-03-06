import React, { useContext, useEffect, useState } from 'react';
import {
  Alert, Button, Col, Dropdown, Form, Modal, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../../Context';
import { editBook, fetchBooks, fetchOneBook } from '../../API/BookAPI';

const EditBook = observer(({ show, onHide }) => {
  const { book } = useContext(Context);
  const [selectedBook, setSelectedBook] = useState({});

  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);
  const [domain, setDomain] = useState({});
  const [author, setAuthor] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [pages, setPages] = useState(0);
  const [language, setLanguage] = useState('');
  const [translator, setTranslator] = useState([]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [responseError, setResponseError] = useState({ message: '', errors: [] });

  useEffect(() => {
    if (selectedBook) {
      setName(selectedBook.name);
      setPrice(selectedBook.price);
      if (Array.isArray(selectedBook.author)) {
        const arr = [];
        selectedBook.author.forEach((item) => arr.push({ name: item, index: Date.now() }));
        setAuthor((prevState) => [...prevState, ...arr]);
      }
      setPublisher(selectedBook.publisher);
      setYear(selectedBook.year);
      setPages(selectedBook.pages);
      setLanguage(selectedBook.language);
      if (Array.isArray(selectedBook.translator)) {
        const arr = [];
        selectedBook.translator.forEach((item) => arr.push({ name: item, index: Date.now() }));
        setTranslator((prevState) => [...prevState, ...arr]);
      }
      setDescription(selectedBook.description);
    }
  }, [selectedBook]);

  useEffect(() => {
    fetchBooks(null, null, book.totalCount).then((data) => book.setBooks(data.message.books));
  }, [show]);

  const clearValues = () => {
    setName('');
    setPrice(1);
    setDomain({});
    setAuthor((prevState) => [...prevState, []]);
    setPublisher('');
    setYear(new Date().getFullYear());
    setPages(0);
    setLanguage('');
    setTranslator((prevState) => [...prevState, []]);
    setDescription('');
    setSelectedBook({});
  };

  const fetchSelectedBook = (id) => {
    fetchOneBook(id).then((data) => {
      setSelectedBook(data.message);
    });
  };

  const addAuthor = () => {
    setAuthor([...author, { name: '', index: Date.now() }]);
  };
  const removeAuthor = (number) => {
    setAuthor(author.filter((i) => i.index !== number));
  };
  const changeAuthor = (key, value, number) => {
    setAuthor(author.map((i) => (i.index === number ? { ...i, [key]: value } : i)));
  };
  const addTranslator = () => {
    setTranslator([...translator, { name: '', index: Date.now() }]);
  };
  const removeTranslator = (number) => {
    setTranslator(translator.filter((i) => i.index !== number));
  };
  const changeTranslator = (key, value, number) => {
    setTranslator(translator.map((i) => (i.index === number ? { ...i, [key]: value } : i)));
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addBook = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('domain', domain._id);
    formData.append('author', JSON.stringify(author));
    formData.append('publisher', publisher);
    formData.append('price', `${price}`);
    formData.append('year', `${year}`);
    formData.append('pages', `${pages}`);
    formData.append('language', language);
    formData.append('translator', JSON.stringify(translator));
    formData.append('description', description);
    formData.append('image', file);
    if (Object.keys(selectedBook).length !== 0) {
      editBook(formData, selectedBook._id).then((response) => {
        if (response.status === 'FAIL') {
          return setResponseError({ message: response.message, errors: response.errors });
        }
        clearValues();
        fetchBooks().then((data) => book.setBooks(data.message.books));
        return onHide();
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ?????????????????????????? ??????????
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError.errors.map((error) => (
          <Alert variant="danger">{error}</Alert>
        ))}
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{selectedBook.name || '???????????????? ??????????'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {book.books && book.books.map((item) => (
                <Dropdown.Item
                  onClick={() => {
                    fetchSelectedBook(item._id);
                  }}
                  key={item._id}
                >{item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedBook.name
          && (
            <>
              <Dropdown className="mt-3">
                <Dropdown.Toggle>{domain.name || '???????????????? ????????????'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {book.domains && book.domains.map((item) => (
                    <Dropdown.Item
                      onClick={() => setDomain({ _id: item._id, name: item.name })}
                      key={item._id}
                    >{item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3"
                placeholder="????????????????"
              />
              ??????????????????
              <Form.Control
                value={price}
                onChange={(e) => setPrice(Math.floor(Math.max((Number(e.target.value)), 1)))}
                className="mt-3"
                type="number"
              />
              ?????? ????????????????????
              <Form.Control
                value={year}
                onChange={(e) => setYear(Math.floor(Math.max((Number(e.target.value)), 1)))}
                className="mt-3"
                type="number"
              />
              ???????????????????? ??????????????
              <Form.Control
                value={pages}
                onChange={(e) => setPages(Math.floor(Math.max((Number(e.target.value)), 1)))}
                className="mt-3"
                type="number"
              />
              <Form.Control
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="mt-3"
                placeholder="????????????????"
              />
              <Form.Control
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-3"
                placeholder="????????"
              />
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-3"
                placeholder="???????????????? (??????????????????????)"
                as="textarea"
              />
              <Form.Control
                className="mt-3"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={selectFile}
              />
              <hr />
              <Button
                variant="outline-dark"
                onClick={addAuthor}
              >
                ???????????????? ????????????
              </Button>
              {author.map((i) => (
                <Row className="mt-4" key={i.index}>
                  <Col md={4}>
                    <Form.Control
                      value={i.name}
                      onChange={(e) => changeAuthor('name', e.target.value, i.index)}
                      placeholder="?????????????? ??????"
                    />
                  </Col>
                  <Col md={4}>
                    <Button
                      onClick={() => removeAuthor(i.index)}
                      variant="outline-danger"
                    >
                      ??????????????
                    </Button>
                  </Col>
                </Row>
              ))}
              <hr />
              <Button
                variant="outline-dark"
                onClick={addTranslator}
              >
                ???????????????? ?????????????????????? (??????????????????????)
              </Button>
              {translator.map((i) => (
                <Row className="mt-4" key={i.index}>
                  <Col md={4}>
                    <Form.Control
                      value={i.name}
                      onChange={(e) => changeTranslator('name', e.target.value, i.index)}
                      placeholder="?????????????? ??????"
                    />
                  </Col>
                  <Col md={4}>
                    <Button
                      onClick={() => removeTranslator(i.index)}
                      variant="outline-danger"
                    >
                      ??????????????
                    </Button>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>??????????????</Button>
        <Button variant="outline-success" onClick={addBook}>????????????????</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditBook;
