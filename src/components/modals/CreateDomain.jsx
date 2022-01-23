import React, { useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { createDomain } from '../../API/BookAPI';

const { REQUEST_RESPONSES } = require('../../utils/Constants');

function CreateDomain({ show, onHide }) {
  const [name, setName] = useState('');
  const [responseError, setResponseError] = useState({ message: '', errors: [] });
  const addDomain = () => {
    if (name.length > 1) {
      createDomain({ name }).then((response) => {
        if (response.status === REQUEST_RESPONSES.FAIL) {
          return setResponseError({ message: response.message, errors: response.errors });
        }
        setName('');
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
          Добавить новый раздел
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError.errors.map((error) => (
          <Alert key={responseError.errors.indexOf(error)} variant="danger">{error}</Alert>
        ))}
        <Form>
          <Form.Control
            placeholder="Введите название раздела"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDomain}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  );
}

export default CreateDomain;
