import {ChevronLeft, ChevronRight, X} from 'lucide-react';

import {Carousel} from 'react-responsive-carousel';

import './card.scss';
import {images} from '../../../../assets/imagesAssets';
import {ModalProps} from '../../../../types/types';

const Card = ({closeModal}: ModalProps) => {
  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img
        className='card__info--carusel__item'
        src={images.product}
        alt='product'
      />
    </div>
  ));

  // TODO:Начать делать стили

  return (
    <div className='card'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='card__info'>
        <Carousel
          className='card__info--carusel'
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showThumbs={false}
        >
          {items}
        </Carousel>

        <div className='card__info--text'>
          <h3 className='card__info--text_title'>
            Jordan 4 Retro SE Craft Photon Dust
          </h3>
          <p className='card__info--text__price'>23456₽</p>
        </div>

        <select className='card__info--sizes' name='size'>
          <option hidden>Выбери размер</option>
          <option value='8'>8 us</option>
          <option value='8.5'>8.5 us</option>
          <option value='9'>9 us</option>
        </select>

        <div className='card__info--btns'>
          <a className='card__info--btns_basket' href='/'>
            <ChevronLeft />В корзину
          </a>
          <a className='card__info--btns_order' href='/'>
            Заказать <ChevronRight />
          </a>
        </div>

        <p className='card__info__subtitle'>
          Кроссовки Air Jordan 4 Retro SE "Craft Photon Dust" Основа пары
          выполнена из премиальной гладкой кожи пыльно-серого цвета, а также
          натуральной замши в том же оттенке.
        </p>
      </div>
    </div>
  );
};

export default Card;
