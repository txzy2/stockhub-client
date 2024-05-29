import {
  ArrowBigRightDash,
  ArrowBigUpDash,
  Footprints,
  Loader,
  Search,
  Shirt,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import './main.scss';

import Filter from './components/Filter/Filter';
import {Filters, Product, ProductReceive} from '../../types/types';
import {FetchFilters} from '../../hooks/fetchFilters';
import Cloth from './components/ClothComponent/Cloth';
import Shoes from './components/ShooesComponent/Shoes';
import {images} from '../../assets/imagesAssets';
import Footer from '../footer/Footer';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Main = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProductData, setFilteredProductData] = useState<Product[]>([]);

  // NOTE: DEFAULT OPEN STATE
  const [selectedButton, setSelectedButton] = useState<string | null>('shoe');

  // NOTE: FILTERS_DATA
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    var: selectedButton ?? '',
    color: '',
    brand: '',
    size: '',
    material: '',
    locations: '',
    priceRange: {from: '', to: ''},
  });

  // NOTE: PRODUCT_DATA
  const [productData, setProductData] = useState<ProductReceive | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NOTE: FILTERS_FUNC
  const openFilter = () => {
    setIsFilterOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeClose = () => {
    setIsFilterOpen(false);
    document.body.classList.remove('modal-open');
  };

  const applyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    setSelectedFilters(filters);

    if (filters.var === 'cloth') {
      setSelectedButton('cloth');
    } else if (filters.var === 'shoe') {
      setSelectedButton('shoe');
    } else {
      setSelectedButton(null);
    }
  };

  const removeFilter = (keyToRemove: keyof Filters) => {
    if (!appliedFilters) return;
    const updatedFilters = {...appliedFilters};
    delete updatedFilters[keyToRemove];
    setAppliedFilters(updatedFilters);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedButton(category);
    setAppliedFilters(null);
  };

  useEffect(() => {
    setIsLoading(true);
    if (appliedFilters !== null) {
      FetchFilters(selectedButton, appliedFilters ?? {}, data => {
        setProductData(data);
        setIsLoading(false);
      });
    } else {
      FetchFilters(selectedButton, {}, data => {
        setProductData(data);
        setIsLoading(false);
      });
    }
  }, [selectedButton, appliedFilters, setProductData]);

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProductData(productData);
    } else {
      const filteredData = productData.filter(product =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProductData(filteredData);
    }
  }, [searchQuery, productData]);

  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img className='main__carousel--item' src={images.slide} alt='product' />
    </div>
  ));

  return (
    <div className='main'>
      <section className='main__search'>
        <div className='main__search_container'>
          <div className='main__search_container--input'>
            <Search size={28} />
            <input
              className='main__search_container--input_text'
              placeholder='Поиск по бренду...'
              value={searchQuery}
              onChange={handleSearchInputChange}
            ></input>
          </div>
          <button
            className='main__search_container--filter'
            onClick={openFilter}
          >
            <SlidersHorizontal size={28} />
          </button>
        </div>

        {appliedFilters && (
          <div className='main__search_filters'>
            {Object.entries(appliedFilters).map(
              ([key, value]) =>
                key !== 'priceRange' &&
                value !== undefined &&
                value !== '' && (
                  <div key={key} className='main__search_filters--item'>
                    <span>
                      {String(
                        value === 'cloth'
                          ? 'Одежда'
                          : value === 'shoe'
                          ? 'Обувь'
                          : value
                      )}{' '}
                    </span>
                    <button onClick={() => removeFilter(key as keyof Filters)}>
                      <X size={20} />
                    </button>
                  </div>
                )
            )}
          </div>
        )}
      </section>

      <div className='main__btn'>
        <button
          className={`main__btn-item ${
            selectedButton === 'cloth' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('cloth')}
        >
          <Shirt size={30} />
          Одежда
        </button>

        <button
          className={`main__btn-item ${
            selectedButton === 'shoe' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('shoe')}
        >
          <Footprints />
          Обувь
        </button>
      </div>

      {/*TODO: Добавить еще по 2 слайда*/}
      <section className='main__sections'>
        <div className='main__carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showThumbs={false}
          >
            {items}
          </Carousel>
        </div>
      </section>

      {filteredProductData.length > 0 && !isLoading ? (
        <>
          {(selectedButton === 'cloth' ||
            (appliedFilters && appliedFilters.var === 'cloth')) && <Cloth />}

          {selectedButton === 'shoe' && (
            <Shoes productData={filteredProductData} />
          )}
        </>
      ) : isLoading ? (
        <div className={'load'}>
          <Loader className='animate-spin-slow spinner' size={30} />
        </div>
      ) : (
        <div style={{textAlign: 'center'}}>Ничего не найдено</div>
      )}

      <ArrowBigUpDash size={50} onClick={scrollToTop} className='arrow_up' />

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{opacity: 0, x: 1000}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 1000}}
            transition={{duration: 0.5}}
            className='modal-right'
          >
            <Filter
              closeModal={closeClose}
              applyFilters={applyFilters}
              FilterSelected={selectedFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
