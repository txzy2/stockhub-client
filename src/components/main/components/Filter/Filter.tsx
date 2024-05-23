import React, {useState} from 'react';
import './filter.scss';
import {Filters} from '../../../../types/types';
import {ArrowBigRightDash, X} from 'lucide-react';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: ['Серые', 'Красные'],
  brands: ['Nike', 'Puma', 'Jordan'],
  material: ['Кожа', 'Текстиль'],
  sizesShoes: [
    '5', '6', '7',
    '8', '9', '10',
    '11', '12', '13'
  ],
  sizesCloth: [
    'S', 'M', 'L', 'XL', '2XL', '3XL'
  ]
};

interface FilterSelectProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  isShoe?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({label, options, onSelect, isShoe = false}) => (
  <div className="filter__options">
    <select
      className="filter__options--select"
      onChange={e => onSelect(e.target.value)}
    >
      <option hidden value="">
        {label}
      </option>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>
          {label === 'Размеры' && isShoe ? option + 'us' : option}
        </option>
      ))}
    </select>
    <ArrowBigRightDash className="filter__options--arrow" size={25} />
  </div>
);

interface FilterProps {
  closeModal: () => void;
  applyFilters: (filters: Filters) => void;
}

const Filter: React.FC<FilterProps> = ({closeModal, applyFilters}) => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    var: '',
    color: '',
    brand: '',
    size: '',
    material: '',
    locations: '',
    priceRange: {from: '', to: ''}
  });

  const [clothShoeSelected, setClothShoeSelected] = useState<string | null>(null);

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
      [filterName]: value
    }));

    if (filterName === 'var') {
      setClothShoeSelected(value);
    }
  };

  return (
    <>
      <button type="button" onClick={closeModal}>
        <X className="exit" size={30} />
      </button>

      <div className="filter">
        <form onSubmit={handleApplyFilters}>
          <FilterSelect
            label="Одежда / Обувь"
            options={options.clothes}
            onSelect={value => handleSelect('var', value === 'Одежда' ? 'cloth' : 'shoe')}
          />
          <div className="filter__error">
            {!clothShoeSelected && <span>Пожалуйста, выберите значение поля "Одежда / Обувь"</span>}
          </div>
          <FilterSelect
            label="Цвет"
            options={options.colors}
            onSelect={value => handleSelect('color', value)}
          />
          <FilterSelect
            label="Бренд"
            options={options.brands}
            onSelect={value => handleSelect('brand', value)}
          />
          <FilterSelect
            label="Размеры"
            options={clothShoeSelected === 'cloth' ? options.sizesCloth : options.sizesShoes}
            onSelect={value => handleSelect('size', value)}
            isShoe={clothShoeSelected === 'shoe'}
          />
          <FilterSelect
            label="Материал"
            options={options.material}
            onSelect={value => handleSelect('material', value)}
          />

          <div className="filter__options_price">
            <input
              className="filter__options_price--input"
              type="number"
              placeholder="От"
              value={selectedFilters.priceRange?.from}

            />
            <input
              className="filter__options_price--input"
              type="number"
              placeholder="До"
              value={selectedFilters.priceRange?.to}

            />
          </div>

          <button className="filter__btn" type="submit">
            Применить фильтры
          </button>
        </form>
      </div>
    </>
  );
};

export default Filter;
