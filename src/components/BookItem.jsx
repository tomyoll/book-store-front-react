import React, { useContext } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BOOK_ROUTE } from '../utils/Constants';
import Context from '../Context';
import { updateWishList } from '../API/UserAPI';

const BookItem = observer(({ item }) => {
  const { user } = useContext(Context);
  const wishList = user.wishList.list;
  const history = useHistory();

  return (
    <Col
      md={3}
      className="mt-3"
    >
      <Card style={{ width: 300, border: 'none' }}>
        <Image
          width={300}
          height={350}
          style={{ cursor: 'pointer' }}
          src={`${process.env.REACT_APP_API_URL}/${item.image}`}
          onClick={() => history.push(`${BOOK_ROUTE}/${item._id}`)}
        />
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
            <div>{item.price} грн</div>
            {user.isAuth
              ? (
                <Image
                  src={wishList.includes(item._id) ? '/heart-filled.svg' : '/heart.svg'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (wishList.includes(item._id)) {
                      user.removeFromWishList(item._id);
                    } else {
                      user.addToWishList(item._id);
                    }
                    updateWishList(user.user._id, wishList);
                  }}
                />
              ) : null}
          </div>
          <div className="text-black-50">{item.author}</div>
        </div>
      </Card>
    </Col>
  );
});

export default BookItem;
