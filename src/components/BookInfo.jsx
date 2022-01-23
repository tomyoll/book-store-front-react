import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { fetchOneDomain } from '../API/BookAPI';

function BookInfo({ book }) {
  const [domainName, setDomainName] = useState('');

  useEffect(() => {
    fetchOneDomain(book.domain).then((response) => {
      setDomainName(response.message.name);
    });
  }, []);

  return (
    <Row className="d-flex flex-column m-3 mt-5">
      <Row style={{ background: 'lightgray', padding: 10 }}>
        Раздел: {domainName}
      </Row>
      <Row style={{ background: 'transparent', padding: 10 }}>
        Автор(ры): {book.author}
      </Row>
      <Row style={{ background: 'lightgray', padding: 10 }}>
        Издатель: {book.publisher}
      </Row>
      <Row style={{ background: 'transparent', padding: 10 }}>
        Год издания: {book.year}
      </Row>
      <Row style={{ background: 'lightgray', padding: 10 }}>
        Число страниц: {book.pages}
      </Row>
      <Row style={{ background: 'transparent', padding: 10 }}>
        Язык: {book.language}
      </Row>
      <Row style={{ background: 'lightgray', padding: 10 }}>
        Переводчик(и): {book.translators}
      </Row>
    </Row>
  );
}

export default BookInfo;
