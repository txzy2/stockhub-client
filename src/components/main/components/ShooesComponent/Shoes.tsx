import React, {useState} from 'react';
import './shooes.scss';
import {Product, ProductReceive} from '../../../../types/types';
import {ArrowBigRightDash, Loader} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import {AnimatePresence, motion} from 'framer-motion';
import Card from '../Card/Card';


const Shoes = ({productData}: {productData: ProductReceive}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductReceive | []>([]);

  const openCard = (product: Product) => {
    setSelectedProduct([product]);
    setIsCardOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeCard = () => {
    setIsCardOpen(false);
    document.body.classList.remove('modal-open');
  };

  if (!productData || productData.length === 0) {
    return (
      <div className={'load'}>
        <Loader className="animate-spin-slow spinner" size={30} />
      </div>
    );
  }

  return (
    <div className="shooes mt-3">
      <div className="shooes">

        {productData.map((product, index) => (
          <div
            className="shooes__product"
            key={index}
            onClick={() => openCard(product)}
          >
            <div className="shooes__product_carousel">
              <Carousel
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showThumbs={false}
              >
                {product.photos.map((photo, photoIndex) => (
                  <div key={photoIndex}>
                    <img
                      className="shooes__product_carousel--img"
                      src={`https://stockhub12.ru/uploads/${product.article}/${photo}`}
                      alt={`${product.name} ${product.brand} ${product.model}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="shooes__product_info">
              <p className="shooes__product_info--title">
                {product.brand} {product.model}
              </p>

              <div className="">
                <div>
                  <span className="font-medium">Цвет: </span>{' '}
                  {product.color?.map(color => color)}
                </div>

                <p className="font-medium">Размеры (us): </p>
                <div className="shooes__product_info--sizes">
                  {product.size !== undefined && product.size.length > 0 && product.size.map((variant, index, array) => (
                    <React.Fragment key={index}>
                      <span>{variant}</span>
                      {index !== array.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="shooes__product_price">
                {product.price?.map(item => item)}₽
                <ArrowBigRightDash className="filter__options--arrow" size={25} />
              </div>
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
            className="modal"
          >
            <Card closeModal={closeCard} product={selectedProduct} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shoes;
