import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBook from '../components/modals/CreateBook';
import CreateDomain from '../components/modals/CreateDomain';
import DeleteDomain from '../components/modals/DeleteDomain';
import DeleteBook from '../components/modals/DeleteBook';
import EditBook from '../components/modals/EditBook';
import EditDomain from '../components/modals/EditDomain';

function Admin() {
  const [createBookVisible, setCreateBookVisible] = useState(false);
  const [createDomainVisible, setCreateDomainVisible] = useState(false);
  const [deleteBookVisible, setDeleteBookVisible] = useState(false);
  const [deleteDomainVisible, setDeleteDomainVisible] = useState(false);
  const [editBookVisible, setEditBookVisible] = useState(false);
  const [editDomainVisible, setEditDomainVisible] = useState(false);
  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-success" className="mt-4 p-2" onClick={() => setCreateBookVisible(true)}>Добавить книгу</Button>
      <Button variant="outline-success" className="mt-4 p-2" onClick={() => setCreateDomainVisible(true)}>Добавить раздел</Button>
      <hr />
      <Button variant="outline-danger" className="mt-4 p-2" onClick={() => setDeleteBookVisible(true)}>Удалить товар</Button>
      <Button variant="outline-danger" className="mt-4 p-2" onClick={() => setDeleteDomainVisible(true)}>Удалить раздел</Button>
      <hr />
      <Button variant="outline-info" className="mt-4 p-2" onClick={() => setEditBookVisible(true)}>Редактировать товар</Button>
      <Button variant="outline-info" className="mt-4 p-2" onClick={() => setEditDomainVisible(true)}>Редактировать раздел</Button>
      <CreateBook show={createBookVisible} onHide={() => setCreateBookVisible(false)} />
      <CreateDomain show={createDomainVisible} onHide={() => setCreateDomainVisible(false)} />
      <DeleteBook show={deleteBookVisible} onHide={() => setDeleteBookVisible(false)} />
      <DeleteDomain show={deleteDomainVisible} onHide={() => setDeleteDomainVisible(false)} />
      <EditBook show={editBookVisible} onHide={() => setEditBookVisible(false)} />
      <EditDomain show={editDomainVisible} onHide={() => setEditDomainVisible(false)} />
    </Container>
  );
}

export default Admin;
