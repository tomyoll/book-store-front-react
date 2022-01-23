import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'react-bootstrap';
import Context from '../Context';

const Pages = observer(() => {
  const { book } = useContext(Context);
  const pageCount = Math.ceil(book.totalCount / book.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i += 1) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={book.page === page}
          onClick={() => book.setPage(page)}
        >{page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
