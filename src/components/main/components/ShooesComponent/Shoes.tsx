import {Carousel} from 'react-responsive-carousel';
import {images} from '../../../../assets/imagesAssets';
import {ArrowBigUpDash} from 'lucide-react';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Card from '../Card/Card';

import './shooes.scss';

const Shooes = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const openCard = () => {
    setIsCardOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeCard = () => {
    setIsCardOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <div className='shooes mt-3'>
      <div className='shooes__product' onClick={openCard}>
        <div className='shooes__product_carousel'>
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
        <div className='shooes__product_info'>
          <p className='shooes__product_info--title'>
            Jordan 4 Retro SE Craft Photon Dust
          </p>
          <div className=''>
            <p className='font-medium'>Размеры: </p>
            <div className='shooes__product_info--sizes'>
              <p className=''>8, </p>
              <p className=''>8.5, </p>
              <p className=''>9, </p>
              <p className=''>9.5</p>
            </div>
          </div>

          <div className='shooes__product_price'>
            <p className='shooes__product_price--value'>23 457₽</p>
            <ArrowBigUpDash size={30} />
          </div>
        </div>
      </div>

      <div className='shooes__product' onClick={openCard}>
        <div className='shooes__product_carousel'>
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
        <div className='shooes__product_info'>
          <p className='shooes__product_info--title'>
            Jordan 4 Retro SE Craft Photon Dust
          </p>
          <div className=''>
            <p className='font-medium'>Размеры: </p>
            <div className='shooes__product_info--sizes'>
              <p className=''>8, </p>
              <p className=''>8.5, </p>
              <p className=''>9, </p>
              <p className=''>9.5</p>
            </div>
          </div>

          <div className='shooes__product_price'>
            <p className='shooes__product_price--value'>23 457₽</p>
            <ArrowBigUpDash size={30} />
          </div>
        </div>
      </div>

      <div className='shooes__product' onClick={openCard}>
        <div className='shooes__product_carousel'>
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
        <div className='shooes__product_info'>
          <p className='shooes__product_info--title'>
            Jordan 4 Retro SE Craft Photon Dust
          </p>
          <div className=''>
            <p className='font-medium'>Размеры: </p>
            <div className='shooes__product_info--sizes'>
              <p className=''>8, </p>
              <p className=''>8.5, </p>
              <p className=''>9, </p>
              <p className=''>9.5</p>
            </div>
          </div>

          <div className='shooes__product_price'>
            <p className='shooes__product_price--value'>23 457₽</p>
            <ArrowBigUpDash size={30} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='modal'
          >
            <Card closeModal={closeCard} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shooes;
