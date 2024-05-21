import {ChevronLeft, ChevronRight, Loader, X} from 'lucide-react';

import {Carousel} from 'react-responsive-carousel';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';

const Card = ({
                closeModal,
                product
              }: ModalProps & {product: ProductReceive | null}) => {
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
              {item.variants.map(value => value.price)}₽
            </p>
          </div>

          <select className="card__info--sizes" name="size">
            <option hidden>Выбери размер</option>
            {item.variants[0]?.size?.map((size, sizeIndex) => (
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

          <p className="card__info__subtitle">
            {item.name} {item.model} {item.brand} Основа пары выполнена из{' '}
            {item.material} в {item.variants[0].color} цвете.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;
