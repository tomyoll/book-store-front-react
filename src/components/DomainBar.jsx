import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import Context from '../Context';

const DomainBar = observer(() => {
  const { book } = useContext(Context);
  return (
    <ListGroup className="px-5">
      {(Array.isArray(book.domains) && book.domains) && book.domains.map((domain) => (
        <ListGroup.Item
          active={domain._id === book.selectedDomain._id}
          onClick={() => book.setSelectedDomain(domain)}
          key={domain._id}
          style={{ height: 60, cursor: 'pointer' }}
          className="d-flex align-items-center"
        >
          {domain.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});
export default DomainBar;
