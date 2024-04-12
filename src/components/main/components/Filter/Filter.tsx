import {X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';

import './filter.scss';

const Filter = ({closeModal}: ModalProps) => {
  return (
    <div className='filter'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <form action=''>
        <div className='filter__options'>
          <label className='grid'>
            Одежда / Обувь
            <select className='filter__options--select'>
              <option value='cloth'>Одежда</option>
              <option value='sneaker'>Обувь</option>
            </select>
          </label>
        </div>

        <div className='filter__options'>
          <label className='grid'>
            Цвет
            <select className='filter__options--select'>
              <option value='gray'>Серый</option>
              <option value='red'>Красный</option>
            </select>
          </label>
        </div>

        <div className='filter__options'>
          <label className='grid'>
            Бренд
            <select className='filter__options--select'>
              <option value='nike'>Nike</option>
              <option value='puma'>Puma</option>
              <option value='jordan'>Jordan</option>
            </select>
          </label>
        </div>

        <div className='filter__options'>
          <label className='grid'>
            Откуда
            <select className='filter__options--select'>
              <option value='msk'>MCK</option>
              <option value='poizon'>Poizon</option>
            </select>
          </label>
        </div>

        <div className='filter__options_price'>
          <input
            className='filter__options_price--input'
            type='number'
            placeholder='От'
          />
          <input
            className='filter__options_price--input'
            type='number'
            placeholder='До'
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
