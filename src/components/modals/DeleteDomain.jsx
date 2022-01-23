import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button, Dropdown, Form, Modal,
} from 'react-bootstrap';
import Context from '../../Context';
import {
  deleteDomain, fetchDomains,
} from '../../API/BookAPI';

function DeleteDomain({ show, onHide }) {
  const { book } = useContext(Context);
  const [domainItem, setDomainItem] = useState({});
  const [responseError, setResponseError] = useState({ errors: [] });

  const handleClick = () => {
    if (Object.keys(domainItem).length !== 0) {
      deleteDomain(domainItem._id).then((res) => {
        if (res.status === 'FAIL') {
          return setResponseError(res.errors);
        }
        setDomainItem({});
        return onHide();
      });
    }
  };

  useEffect(() => {
    fetchDomains().then((data) => book.setDomains(data.message));
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить раздел
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError.errors.map((error) => (
          <Alert variant="danger">{error}</Alert>
        ))}
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{domainItem.name || 'Выберите раздел'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {book.domains && book.domains.map((item) => (
                <Dropdown.Item
                  onClick={() => setDomainItem({ _id: item._id, name: item.name })}
                  key={item._id}
                >{item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={handleClick}>Удалить</Button>

      </Modal.Footer>
    </Modal>
  );
}

export default DeleteDomain;
