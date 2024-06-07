import React, {useState} from 'react';
import './filter.scss';
import {Filters} from '../../../../types/types';
import {ArrowBigRightDash, X} from 'lucide-react';
import {Slider} from '@material-ui/core';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: ['Серые', 'Красные', 'Черные', 'Голубые', 'Белые'],
  brands: ['Nike', 'Puma', 'Jordan'],
  material: ['Кожа', 'Текстиль', 'Ткань'],
  sizesShoes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
  sizesCloth: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
};

interface FilterSelectProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  isShoe?: boolean;
  selectedValue?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  onSelect,
  isShoe = false,
  selectedValue,
}) => {
  return (
    <div className='filter__options'>
      <select
        className='filter__options--select'
        onChange={e => onSelect(e.target.value)}
        value={selectedValue ? selectedValue : label}
      >
        <option hidden value=''>
          {label}
        </option>

        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {label === 'Размеры' && isShoe ? option + 'us' : option}
          </option>
        ))}
      </select>

      <ArrowBigRightDash className='filter__options--arrow' size={25} />
    </div>
  );
};

interface FilterProps {
  closeModal: () => void;
  applyFilters: (filters: Filters) => void;
  FilterSelected: Filters;
}

const Filter: React.FC<FilterProps> = ({
  closeModal,
  applyFilters,
  FilterSelected,
}) => {
  const [selectedFilters, setSelectedFilters] =
    useState<Filters>(FilterSelected);
  const [value, setValue] = React.useState([7000, 11000]);

  // NOTE: SIZE_FILTER
  const [clothShoeSelected, setClothShoeSelected] = useState<string | null>(
    null
  );
  const [visible, setVisible] = useState(false);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clothShoeSelected) {
      return;
    }

    applyFilters(selectedFilters);
    closeModal();
  };

  const handleSelect = (filterName: keyof Filters, value: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));

    if (selectedFilters.var) {
      setVisible(true);
      setClothShoeSelected(value);
    }
  };

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
    selectedFilters.priceRange = {
      from: value[0].toString(),
      to: value[1].toString(),
    };
  };

  return (
    <>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='filter'>
        <form onSubmit={handleApplyFilters}>
          <FilterSelect
            label={'Одежда / Обувь'}
            options={options.clothes}
            onSelect={value =>
              handleSelect('var', value === 'Одежда' ? 'cloth' : 'shoe')
            }
            selectedValue={selectedFilters.var}
          />

          {visible && (
            <>
              <FilterSelect
                label='Цвет'
                options={options.colors}
                onSelect={value => handleSelect('color', value)}
                selectedValue={selectedFilters.color}
              />
              <FilterSelect
                label='Бренд'
                options={options.brands}
                onSelect={value => handleSelect('brand', value)}
                selectedValue={selectedFilters.brand}
              />
              <FilterSelect
                label='Материал'
                options={options.material}
                onSelect={value => handleSelect('material', value)}
                selectedValue={selectedFilters.material}
              />
              <FilterSelect
                label='Размеры'
                options={
                  clothShoeSelected === 'cloth'
                    ? options.sizesCloth
                    : options.sizesShoes
                }
                onSelect={value => handleSelect('size', value)}
                isShoe={clothShoeSelected === 'shoe'}
                selectedValue={selectedFilters.size}
              />
            </>
          )}

          {/*TODO: Доделать выбор цен*/}
          <div className={'filter__options--price'}>
            <label
              className={'filter__options--price__label'}
              htmlFor={'price'}
            >
              Цена
            </label>
            <div className={'filter__options--price__container'}>
              <span>{value[0]} ₽</span>
              <span>{value[1]} ₽</span>
            </div>

            <Slider
              value={value}
              min={1000}
              max={100000}
              onChange={rangeSelector}
              valueLabelDisplay='auto'
              name={'price'}
            />
          </div>

          <button className='filter__btn' type='submit'>
            Применить фильтры
          </button>
        </form>
      </div>
    </>
  );
};

export default Filter;
