import {X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';

import './basket.scss';

const Basket = ({closeModal}: ModalProps) => {
  return (
    <div className='basket'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>
      <div className='basket__title'>Корзина пуста!</div>
    </div>
  );
};

export default Basket;
