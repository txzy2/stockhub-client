import {Carousel} from 'react-responsive-carousel';
import {Loader} from 'lucide-react';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Card from '../Card/Card';
import './shooes.scss';
import {fetchShoes} from '../../../../hooks/fetchShoes';
import {ProductReceive} from '../../../../types/types';
import {images} from '../../../../assets/imagesAssets';

const Shooes = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [shoeData, setShoeData] = useState<ProductReceive | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const openCard = () => {
    setIsCardOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeCard = () => {
    setIsCardOpen(false);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    fetchShoes('shoe', data => {
      setShoeData(data);
      setIsLoading(false); // Установка isLoading в false после получения данных
    });
  }, []);

  if (isLoading) {
    return (
      <div className='load'>
        <Loader className='animate-spin-slow spinner' size={40} />
      </div>
    );
  }

  if (!isLoading && shoeData && shoeData && shoeData.length > 0) {
    return (
      <div className='shooes mt-3'>
        <div className='shooes'>
          {shoeData.map((product, index) => (
            <div className='shooes__product' key={index} onClick={openCard}>
              <div className='shooes__product_carousel'>
                <Carousel
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={3000}
                  showThumbs={false}
                >
                  {product.photos.map((photo, photoIndex) => (
                    <div key={photoIndex}>
                      <img
                        className='shooes__product_carousel--img'
                        src={`${photo}`}
                        alt={`Product ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className='shooes__product_info'>
                <p className='shooes__product_info--title'>
                  {product.brand} {product.model}
                </p>
                <div className=''>
                  <p className='font-medium'>Размеры: </p>
                  <div className='shooes__product_info--sizes'>
                    {product.variants.map((variant, variantIndex) => (
                      <p key={variantIndex}>
                        {variant.size.map((size, index) => (
                          <span key={index}>
                            {size}us
                            {index !== variant.size.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>

                {/* TODO: ДОбавть получение прайса */}
                <p className='shooes__product_price'>23 457₽</p>
              </div>
            </div>
          ))}
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
  } else {
    return (
      <div className='load'>
        <p>No data available</p>
      </div>
    );
  }
};

export default Shooes;
