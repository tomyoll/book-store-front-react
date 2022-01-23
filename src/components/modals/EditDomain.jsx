import React, { useContext, useState } from 'react';
import {
  Alert, Button, Dropdown, Form, Modal,
} from 'react-bootstrap';
import { editDomain, fetchOneDomain } from '../../API/BookAPI';
import Context from '../../Context';

function EditDomain({ show, onHide }) {
  const [selectedDomain, setSelectedDomain] = useState({});
  const [responseError, setResponseError] = useState({ errors: [] });
  const [name, setName] = useState('');
  const { book } = useContext(Context);

  const editSelectedDomain = () => {
    if (Object.keys(selectedDomain).length !== 0) {
      editDomain(name, selectedDomain._id).then((response) => {
        if (response.status === 'FAIL') {
          return setResponseError({ errors: response.errors });
        }
        setSelectedDomain({});
        setName('');
        return onHide();
      });
    }
  };

  const fetchSelectedDomain = (id) => {
    fetchOneDomain(id).then((data) => {
      setSelectedDomain(data.message);
      setName(data.message.name);
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
          Редактировать раздел
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError.errors.map((error) => (
          <Alert key={responseError.errors.indexOf(error)} variant="danger">{error}</Alert>
        ))}
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{selectedDomain.name || 'Выберите раздел'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {book.domains && book.domains.map((item) => (
                <Dropdown.Item
                  onClick={() => {
                    fetchSelectedDomain(item._id);
                  }}
                  key={item._id}
                >{item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedDomain.name
            && (
            <Form.Control
              className="mt-3"
              placeholder="Введите название раздела"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={editSelectedDomain}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  );
}

export default EditDomain;
