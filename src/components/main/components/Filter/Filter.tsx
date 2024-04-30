import {X} from 'lucide-react';
import {useEffect} from 'react';
import './filter.scss';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: ['Серый', 'Красный'],
  brands: ['Nike', 'Puma', 'Jordan'],
  locations: ['MCK', 'Poizon'],
};

interface FilterSelectProps {
  label: string;
  options: string[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({label, options}) => (
  <div className='filter__options'>
    <label className='filter__options--lable'>
      {label}
      <select className='filter__options--select'>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

const Filter: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='filter'>
        <form action='filter__form'>
          <FilterSelect label='Одежда / Обувь' options={options.clothes} />
          <FilterSelect label='Цвет' options={options.colors} />
          <FilterSelect label='Бренд' options={options.brands} />
          <FilterSelect label='Откуда' options={options.locations} />

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

          {/* TODO: Пофиксить баг с перепрыгиванием кнопки */}

          <button className='filter__btn' type='submit'>
            Применить
          </button>
        </form>
      </div>
    </>
  );
};

export default Filter;
