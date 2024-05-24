import React, {useState} from 'react';
import './filter.scss';
import {Filters} from '../../../../types/types';
import {ArrowBigRightDash, X} from 'lucide-react';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: [
    'Серые',
    'Красные',
    'Черные',
    'Голубые',
    'Белые'
  ],
  brands: ['Nike', 'Puma', 'Jordan'],
  material: ['Кожа', 'Текстиль', 'Ткань'],
  sizesShoes: [
    '5', '6', '7',
    '8', '9', '10',
    '11', '12', '13'
  ],
  sizesCloth: [
    'S', 'M', 'L',
    'XL', '2XL', '3XL'
  ]
};

interface FilterSelectProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  isShoe?: boolean;
  selectedValue?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = (
  {
    label,
    options,
    onSelect,
    isShoe = false,
    selectedValue
  }
) => {
  return (
    // TODO: Сделать правильный проброс selectedValue.var для заголовка Одежда / Обувь
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
};

interface FilterProps {
  closeModal: () => void;
  applyFilters: (filters: Filters) => void;
  FilterSelected: Filters;
}

const Filter: React.FC<FilterProps> = (
  {
    closeModal,
    applyFilters,
    FilterSelected
  }
) => {
  const [selectedFilters, setSelectedFilters] =
    useState<Filters>(FilterSelected);

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
      [filterName]: value
    }));

    if (filterName === 'var') {
      setVisible(true);
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
          {/*TODO: Сделать проверку на var*/}

          <FilterSelect
            label={selectedFilters.var ?? 'Одежда / Обувь'}
            options={options.clothes}
            onSelect={value =>
              handleSelect('var', value === 'Одежда' ? 'cloth' : 'shoe')
            }
            selectedValue={selectedFilters.var}
          />

          <div className="filter__error">
            {!clothShoeSelected && (
              <span>Пожалуйста, выберите значение поля</span>
            )}
          </div>

          {visible && (
            <>
              <FilterSelect
                label="Цвет"
                options={options.colors}
                onSelect={value => handleSelect('color', value)}
                selectedValue={selectedFilters.color}
              />
              <FilterSelect
                label="Бренд"
                options={options.brands}
                onSelect={value => handleSelect('brand', value)}
                selectedValue={selectedFilters.brand}
              />
              <FilterSelect
                label="Материал"
                options={options.material}
                onSelect={value => handleSelect('material', value)}
                selectedValue={selectedFilters.material}
              />
              <FilterSelect
                label="Размеры"
                options={
                  clothShoeSelected === 'cloth'
                    ? options.sizesCloth
                    : options.sizesShoes
                }
                onSelect={value => handleSelect('size', value)}
                isShoe={clothShoeSelected === 'shoe'}
                selectedValue={''}
              />
            </>
          )}

          {/* <div className='filter__options_price'>
            <input
              className='filter__options_price--input'
              type='number'
              placeholder='От'
              value={selectedFilters.priceRange?.from}
            />
            <input
              className='filter__options_price--input'
              type='number'
              placeholder='До'
              value={selectedFilters.priceRange?.to}
            />
          </div> */}

          <button className="filter__btn" type="submit">
            Применить фильтры
          </button>
        </form>
      </div>
    </>
  );
};

export default Filter;
