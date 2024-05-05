import React, { useEffect, useState } from 'react';
import './filter.scss';
import { Filters } from '../../../../types/types';
import { X } from 'lucide-react';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: ['Серый', 'Красный'],
  brands: ['Nike', 'Puma', 'Jordan'],
  locations: ['MCK', 'Poizon'],
};

interface FilterSelectProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  onSelect,
}) => (
  <div className='filter__options'>
    <select
      className='filter__options--select'
      onChange={e => onSelect(e.target.value)}
    >
      <option value='' disabled hidden>
        {label}
      </option>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

interface FilterProps {
  closeModal: () => void;
  applyFilters: (filters: Filters) => void;
}

const Filter: React.FC<FilterProps> = ({ closeModal, applyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    clothes: '',
    colors: '',
    brands: '',
    locations: '',
    priceRange: { from: '', to: '' },
  });

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(selectedFilters);
    closeModal();
  };

  const handleSelect = (filterName: keyof Filters, value: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='filter'>
        <form onSubmit={handleApplyFilters}>
          <FilterSelect
            label='Одежда / Обувь'
            options={options.clothes}
            onSelect={value => handleSelect('clothes', value)}
          />
          <FilterSelect
            label='Цвет'
            options={options.colors}
            onSelect={value => handleSelect('colors', value)}
          />
          <FilterSelect
            label='Бренд'
            options={options.brands}
            onSelect={value => handleSelect('brands', value)}
          />
          <FilterSelect
            label='Откуда'
            options={options.locations}
            onSelect={value => handleSelect('locations', value)}
          />

          <div className='filter__options_price'>
            <input
              className='filter__options_price--input'
              type='number'
              placeholder='От'
              value={selectedFilters.priceRange.from}
              onChange={e =>
                setSelectedFilters(prevFilters => ({
                  ...prevFilters,
                  priceRange: { ...prevFilters.priceRange, from: e.target.value },
                }))
              }
            />
            <input
              className='filter__options_price--input'
              type='number'
              placeholder='До'
              value={selectedFilters.priceRange.to}
              onChange={e =>
                setSelectedFilters(prevFilters => ({
                  ...prevFilters,
                  priceRange: { ...prevFilters.priceRange, to: e.target.value },
                }))
              }
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
