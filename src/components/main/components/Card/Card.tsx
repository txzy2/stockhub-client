import {ChevronLeft, Loader, X} from 'lucide-react';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';
import React, {useState} from 'react';
import {UseTg} from '../../../../hooks/useTg';
import {Carousel} from 'react-responsive-carousel';
import OrderButton from '../../../orderButton/OrderButton';
import {addToBasket} from '../../../../hooks/addToBasket';

const AddToBasket = ({article, size}: {article: string, size: string}) => {
  const {user} = UseTg();

  const handleOrderClick = async () => {
    const data = localStorage.getItem(user?.id.toString());
    // const data = localStorage.getItem('307777256');

    if (!data) {
      console.log('userData is null');
      return null;
    }

    const userData = JSON.parse(data);

    const addData = {
      userId: userData.chat_id,
      // userId: '307777256',
      size,
      article
    };

    const add = addToBasket(addData);

    if (!add) {
      console.log('Error during request');
      return alert('Error during request');
    }

    window.location.reload();
  };

  return (
    <button style={{display: 'flex', alignItems: 'center'}} onClick={handleOrderClick}>
      <ChevronLeft />В корзину
    </button>
  );
};

const Card = ({closeModal, product}: ModalProps & {
                product: ProductReceive | null,
              }
) => {
  const {user} = UseTg();

  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  if (!product || product.length === 0) {
    return (
      <div className="load">
        <Loader className="animate-spin-slow spinner" size={40} />
      </div>
    );
  }

  return (
    <div className="card">
      <button type="button" onClick={closeModal}>
        <X className="exit" size={30} />
      </button>

      {product.map((item, index) => (
        <div className="card__info" key={index}>
          <Carousel
            className="card__info--carusel"
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showThumbs={false}
          >
            {item.photos.map((photo, photoIndex) => (
              <div key={photoIndex}>
                <img
                  className="card__info--carusel__item"
                  src={`https://stockhub12.ru/uploads/${item.article}/${photo}`}
                  alt={`${item.name} ${item.brand} ${item.article}`}
                />
              </div>
            ))}
          </Carousel>

          <div className="card__info--text">
            <h3 className="card__info--text_title">
              {item.name} {item.brand} {item.model}
            </h3>
            <p className="card__info--text__price">
              {item.price}₽
            </p>
          </div>

          <select className="card__info--sizes" name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
          >
            <option hidden>Выбери размер</option>
            {item.size?.map((size, sizeIndex) => (
              <option key={sizeIndex} value={size}>
                {size} us
              </option>
            ))}
          </select>

          {user?.id ? (
            !selectedSize ? (
              <>
                <p style={{color: 'red'}}>Выбери размер</p>
              </>
            ) : (
              <div className={'card__info--btns'}>
                <div className="card__info--btns_basket">
                  <AddToBasket article={item.article} size={selectedSize} />
                </div>

                <div className={'card__info--btns_order'}>
                  <OrderButton amount={item.price?.toString()} brand={item.brand}
                               model={item.model} article={item.article} size={selectedSize} />
                </div>

              </div>
            )
          ) : (
            <>
              <p style={{color: 'red'}}>Для заказа используй мобильную версию Telegram</p>
            </>
          )}

          <div className="card__info--subtitle">
            <span className={''}>{item.name} {item.model} {item.brand}</span>. Материал модели
            - {item.material}. Цвет модели: {item.color?.map(item => item)}.
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
