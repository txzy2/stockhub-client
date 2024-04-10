import {
  ArrowBigUpDash,
  Footprints,
  Search,
  Shirt,
  SlidersHorizontal,
} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import './main.scss';

import {images} from '../../assets/imagesAssets';
import Card from './components/Card/Card';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img className='main__carousel--item' src={images.slide} alt='product' />
    </div>
  ));

  return (
    <div className='main'>
      <section className='main__search'>
        <div className='main__search--input'>
          <Search size={28} />
          <input
            className='main__search--input_text'
            placeholder='Поиск'
          ></input>
        </div>
        <button className='main__search--filter'>
          <SlidersHorizontal size={28} />
        </button>
      </section>

      <div className='main__btn'>
        <button className='main__btn-item'>
          <Shirt size={30} />
          <p>Одежда</p>
        </button>

        <button className='main__btn-item'>
          <Footprints />
          <p>Обувь</p>
        </button>
      </div>

      <section className='main__sections'>
        <div className='main__carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            {items}
          </Carousel>
        </div>
      </section>

      <div className='mt-3'>
        <div className='main__product' onClick={openModal}>
          <div className='main__product_carousel'>
            <Carousel
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              showThumbs={false}
            >
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
            </Carousel>
          </div>
          <div className='main__product_info'>
            <p className='main__product_info--title'>
              Jordan 4 Retro SE Craft Photon Dust
            </p>
            <div className=''>
              <p className='font-medium'>Размеры: </p>
              <div className='main__product_info--sizes'>
                <p className=''>8, </p>
                <p className=''>8.5, </p>
                <p className=''>9, </p>
                <p className=''>9.5</p>
              </div>
            </div>

            <div className='main__product_price'>
              <p className='main__product_price--value'>23 457₽</p>
              <ArrowBigUpDash size={30} />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-3'>
        <div className='main__product' onClick={openModal}>
          <div className='main__product_carousel'>
            <Carousel
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              showThumbs={false}
            >
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
            </Carousel>
          </div>
          <div className='main__product_info'>
            <p className='main__product_info--title'>
              Jordan 4 Retro SE Craft Photon Dust
            </p>
            <div className=''>
              <p className='font-medium'>Размеры: </p>
              <div className='main__product_info--sizes'>
                <p className=''>8, </p>
                <p className=''>8.5, </p>
                <p className=''>9, </p>
                <p className=''>9.5</p>
              </div>
            </div>

            <div className='main__product_price'>
              <p className='main__product_price--value'>23 457₽</p>
              <ArrowBigUpDash size={30} />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-3'>
        <div className='main__product' onClick={openModal}>
          <div className='main__product_carousel'>
            <Carousel
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              showThumbs={false}
            >
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
              <div>
                <img src={images.product} alt='product' />
              </div>
            </Carousel>
          </div>
          <div className='main__product_info'>
            <p className='main__product_info--title'>
              Jordan 4 Retro SE Craft Photon Dust
            </p>
            <div className=''>
              <p className='font-medium'>Размеры: </p>
              <div className='main__product_info--sizes'>
                <p className=''>8, </p>
                <p className=''>8.5, </p>
                <p className=''>9, </p>
                <p className=''>9.5</p>
              </div>
            </div>

            <div className='main__product_price'>
              <p className='main__product_price--value'>23 457₽</p>
              <ArrowBigUpDash size={30} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='modal'
          >
            <Card closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
