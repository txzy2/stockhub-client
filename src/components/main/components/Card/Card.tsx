import {ChevronLeft, ChevronRight, Loader, X} from 'lucide-react';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';
import React, {useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {MonetaEnv} from '../../../../enviroments/env';

const sendData = (amount: string | undefined, email: string, brand: string, model: string, order_id: string): boolean => {

  // TODO: Вынести роут для успешной оплаты (MNT_SUCCESS_URL=&amp;)
  // NOTE: &MNT_SIGNATURE=${signature}& - передать эту сигнатуру с бека

  const generateUrl = `https://www.payanyway.ru/assistant.widget?MNT_ID=${MonetaEnv.mNTID}&MNT_AMOUNT=${amount}&MNT_DESCRIPTION=${'Оплата ' + (brand + model)}&MNT_SUBSCRIBER_ID=${email}&MNT_CURRENCY_CODE=RUB&MNT_TRANSACTION_ID=${order_id}`;

  console.log(generateUrl);
  return true;
};

const OrderButton = ({amount, brand, model}: {
  amount: string | undefined,
  brand: string,
  model: string
}) => {

  const [orderData, setOrderData] = useState<string>('');

  // const email = user?.email ?? '';

  const handleOrderClick = async () => {
    const newAmount = amount?.replace(/\s+/g, '') ?? '0';

    const data = localStorage.getItem('userData');
    const chatId = localStorage.getItem('chatId');

    if (!data) {
      console.log('userData is null');
      return;
    }

    const userData = JSON.parse(data);
    console.log(userData.email);
    console.log(chatId);

    // NOTE: В setOrderData придет order_id
    // await addOrderData(userId ?? '', setOrderData);


    // TODO: Сделать уведомление об ошибке запроса
    if (!orderData) {
      console.log('Ошибка запроса');
      return;
    }

    // sendData(newAmount, email, brand, model, orderData);
  };

  return (
    <button className="card__info--btns_order" onClick={handleOrderClick}>
      Заказать <ChevronRight />
    </button>
  );

};


const Card = (
  {
    closeModal,
    product
  }: ModalProps & {product: ProductReceive | null}
) => {
  const data = localStorage.getItem('userData');
  
  if (!product || product.length === 0 || !data) {
    return (
      <div className="load">
        <Loader className="animate-spin-slow spinner" size={40} />
      </div>
    );
  }

  const userData = JSON.parse(data);

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

          {/*{userData ? (*/}
          <div className="card__info--btns">
            <a className="card__info--btns_basket" href="/">
              <ChevronLeft />В корзину
            </a>
            <OrderButton amount={item.price?.toString()} brand={item.brand}
                         model={item.model} />
          </div>

          {/*) : (*/}
          {/*  <>*/}
          {/*    <p>Для заказа используй мобильную версию Telegram</p>*/}
          {/*  </>*/}
          {/*)}*/}

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
