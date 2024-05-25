import {ChevronLeft, ChevronRight, Loader, X} from 'lucide-react';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';
import React from 'react';
import {Carousel} from 'react-responsive-carousel';

const Card = (
  {
    closeModal,
    product
  }: ModalProps & {product: ProductReceive | null}
) => {

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
              {item.price?.map(value => value)}₽
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

          <div className="card__info--btns">
            <a className="card__info--btns_basket" href="/">
              <ChevronLeft />В корзину
            </a>
            <a className="card__info--btns_order" href="/">
              Заказать <ChevronRight />
            </a>
          </div>

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
