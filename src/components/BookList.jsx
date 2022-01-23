import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import Context from '../Context';
import BookItem from './BookItem';

import { fetchBooksFromWishList } from '../API/BookAPI';

const BookList = observer(({ isWishList = false }) => {
  const { book } = useContext(Context);
  const { user } = useContext(Context);
  const [booksFromWishList, setBooksFromWishList] = useState([]);

  useEffect(() => {
    if (isWishList) {
      fetchBooksFromWishList(user.user._id).then((res) => {
        setBooksFromWishList(res.message);
      });
    }
  }, []);

  if (isWishList) {
    return (
      <Row className="d-flex">
        {booksFromWishList.length > 0 ? booksFromWishList.map((item) => (
          <BookItem key={item._id} item={item} />
        )) : null}
      </Row>
    );
  }
  return (
    <Row className="d-flex">
      {(Array.isArray(book.books) && book.books.length > 0) ? book.books.map((i) => (
        <BookItem key={i._id} item={i} />
      )) : null}
    </Row>
  );
});

export default BookList;
