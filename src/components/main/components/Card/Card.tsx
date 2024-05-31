import {ChevronLeft, ChevronRight, Loader, X} from 'lucide-react';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';
import React, {useEffect, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {UseTg} from '../../../../hooks/useTg';
import {addOrderData} from '../../../../hooks/addOrderData';

const OrderButton = ({amount, brand, model, article}: {
  amount: string | undefined,
  brand: string,
  model: string,
  article: string
}) => {
  const {user} = UseTg();
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleOrderClick = async () => {
    const newAmount = amount?.replace(/\s+/g, '') ?? '0';
    const data = localStorage.getItem(user?.id.toString());
    // const data = localStorage.getItem('307777256');
    if (!data) {
      console.log('userData is null');
      return;
    }
    const userData = JSON.parse(data);

    const paymentData = {
      chat_id: userData.chat_id,
      brand,
      model,
      article,
      amount: newAmount
    };

    const paymentUrl = await addOrderData(paymentData);

    if (!paymentUrl) {
      console.log('Ошибка запроса');
      return alert('Ошибка запроса');
    }
    window.location.href = paymentUrl;
  };

  return (
    <button className="card__info--btns_order" onClick={handleOrderClick}>
      Заказать <ChevronRight />
    </button>
  );

};

const Card = ({closeModal, product}: ModalProps & {product: ProductReceive | null}
) => {
  const {user} = UseTg();

  useEffect(() => {
    console.log(product);
  }, []);

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

          <select className="card__info--sizes" name="size">
            <option hidden>Выбери размер</option>
            {item.size?.map((size, sizeIndex) => (
              <option key={sizeIndex} value={size}>
                {size} us
              </option>
            ))}
          </select>

          {user?.id ? (

            <div className="card__info--btns">
              <a className="card__info--btns_basket" href="/">
                <ChevronLeft />В корзину
              </a>
              <OrderButton amount={item.price?.toString()} brand={item.brand}
                           model={item.model} article={item.article} />
            </div>

          ) : (
            <>
              <p style={{color: 'red'}}>Для заказа используй мобильную версию Telegram</p>
            </>
          )}

          <div className="card__info__subtitle">
            {item.name} {item.model} {item.brand}. Основа пары
            - {item.material}. Цвет модели: {item.color?.map(item => item)}.
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
