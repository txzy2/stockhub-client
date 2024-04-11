import {X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';

import './filter.scss';

const Filter = ({closeModal}: ModalProps) => {
  return (
    <div className='filter'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='filter__options'>
        <label className='grid'>
          Одежда / Обувь
          <select className='filter__options--select'>
            <option value='cloth'>Одежда</option>
            <option value='sneaker'>Обувь</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
