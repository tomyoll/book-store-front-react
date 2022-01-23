import React, { useContext, useState } from 'react';
import {
  Button, Dropdown, Form, Modal,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { deleteBook } from '../../API/BookAPI';
import Context from '../../Context';

const DeleteBook = observer(({ show, onHide }) => {
  const { book } = useContext(Context);
  const [bookItem, setBookItem] = useState({});

  const handleClick = () => {
    if (Object.keys(bookItem).length !== 0) {
      deleteBook(bookItem.id).then(() => {
        setBookItem({});
        onHide();
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
          Удалить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{bookItem.name || 'Выберите книгу'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {book.books.map((item) => (
                <Dropdown.Item
                  onClick={() => setBookItem({ id: item._id, name: item.name })}
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
});

export default DeleteBook;
