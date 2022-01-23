import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button, Col, Dropdown, Form, Modal, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../../Context';
import { createBook, fetchDomains } from '../../API/BookAPI';

const CreateBook = observer(({ show, onHide }) => {
  const { book } = useContext(Context);
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

  const [responseError, setResponseError] = useState({ errors: [] });

  useEffect(() => {
    fetchDomains().then((data) => book.setDomains(data.message));
  }, []);

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

  const clearValues = () => {
    setName('');
    setPrice(1);
    setDomain({});
    setAuthor([]);
    setPublisher('');
    setYear(new Date().getFullYear());
    setPages(0);
    setLanguage('');
    setTranslator([]);
    setDescription('');
  };

  const addBook = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('domain', domain.id);
    formData.append('price', `${price}`);
    formData.append('author', JSON.stringify(author));
    formData.append('publisher', publisher);
    formData.append('year', `${year}`);
    formData.append('pages', `${pages}`);
    formData.append('language', language);
    formData.append('translator', JSON.stringify(translator));
    formData.append('description', description);
    formData.append('image', file);
    createBook(formData).then((response) => {
      if (response.status === 'FAIL') {
        return setResponseError({ errors: response.errors });
      }
      setName('');
      clearValues();
      return onHide();
    });
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
          Добавить книгу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError.errors.map((error) => (
          <Alert variant="danger">{error}</Alert>
        ))}
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{domain.name || 'Выберите раздел'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {book.domains && book.domains.map((item) => (
                <Dropdown.Item
                  onClick={() => setDomain({ id: item._id, name: item.name })}
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
            placeholder="Название"
          />
          Стоимость
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Math.floor(Math.max((Number(e.target.value)), 1)))}
            className="mt-3"
            type="number"
          />
          Год публикации
          <Form.Control
            value={year}
            onChange={(e) => setYear(Math.floor(Math.max((Number(e.target.value)), 1)))}
            className="mt-3"
            type="number"
          />
          Количество страниц
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
            placeholder="Издатель"
          />
          <Form.Control
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-3"
            placeholder="Язык"
          />
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3"
            placeholder="Описание (опционально)"
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
            Добавить автора
          </Button>
          {author.map((i) => (
            <Row className="mt-4" key={i.index}>
              <Col md={4}>
                <Form.Control
                  value={i.name}
                  onChange={(e) => changeAuthor('name', e.target.value, i.index)}
                  placeholder="Введите имя"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeAuthor(i.index)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
          <hr />
          <Button
            variant="outline-dark"
            onClick={addTranslator}
          >
            Добавить переводчика (опционально)
          </Button>
          {translator.map((i) => (
            <Row className="mt-4" key={i.index}>
              <Col md={4}>
                <Form.Control
                  value={i.name}
                  onChange={(e) => changeTranslator('name', e.target.value, i.index)}
                  placeholder="Введите имя"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeTranslator(i.index)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addBook}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateBook;
