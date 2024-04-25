import {ChevronLeft, ChevronRight, X} from 'lucide-react';

import {Carousel} from 'react-responsive-carousel';

import './card.scss';
import {images} from '../../../../assets/imagesAssets';
import {ModalProps} from '../../../../types/types';

const Card = ({closeModal}: ModalProps) => {
  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img
        className='main__carousel--item'
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

      <div className=''>
        <Carousel
          className=''
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showThumbs={false}
        >
          {items}
        </Carousel>

        <div className=''>
          <h3 className=''>Jordan 4 Retro SE Craft Photon Dust</h3>
          <p>
            Кроссовки Air Jordan 4 Retro SE "Craft Photon Dust" Основа пары
            выполнена из премиальной гладкой кожи пыльно-серого цвета, а также
            натуральной замши в том же оттенке.
          </p>
        </div>

        <select className='' name='size'>
          <option hidden>Выбери размер</option>
          <option value='8'>8 us</option>
          <option value='8.5'>8.5 us</option>
          <option value='9'>9 us</option>
        </select>

        <div className=''>
          <a className='' href='/'>
            <ChevronLeft />В корзину
          </a>
          <a className='' href='/'>
            Заказать <ChevronRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
