import React, {useState} from 'react';
import {Product, ProductReceive} from '../../../../types/types';
import {ArrowBigLeftDash, ArrowBigRightDash, ArrowBigUpDash, Import, Loader} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import {AnimatePresence, motion} from 'framer-motion';
import Card from '../Card/Card';
import './shooes.scss';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


const Shoes = ({productData}: {productData: ProductReceive}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductReceive | []>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const openCard = (product: Product) => {
    setSelectedProduct([product]);
    setIsCardOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeCard = () => {
    setIsCardOpen(false);
    document.body.classList.remove('modal-open');
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const showAllProducts = () => {
    setShowAll(true);
  };

  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = showAll
    ? productData
    : productData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productData.length / productsPerPage);

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
        {currentProducts.map((product, index) => (
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
                  {product.size !== undefined &&
                    product.size.length > 0 &&
                    product.size.map((variant, index, array) => (
                      <React.Fragment key={index}>
                        <span>{variant}</span>
                        {index !== array.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                </div>
              </div>

              <div className="shooes__product_price">
                {product.price}₽
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shooes__pagination">

        <div className="shooes__pagination--info">
          <span>{currentPage}</span> из <span>{totalPages}</span>
        </div>

        {!showAll && (
          <div className="shooes__pagination--buttons">

            <button
              className={currentPage === 1 ? 'disabled' : ''}
              title="Наазад"
              onClick={() => changePage(currentPage - 1)}
            >
              <ArrowBigLeftDash size={35} strokeWidth={1} />
            </button>

            <button onClick={showAllProducts} title="Показать все">
              <Import size={35} strokeWidth={1} />
            </button>

            <button
              className={
                currentProducts.length < productsPerPage ? 'disabled' : ''
              }
              title="Вперед"
              onClick={() => changePage(currentPage + 1)}
            >

              <ArrowBigRightDash size={35} strokeWidth={1} />
            </button>
          </div>
        )}

        <button>
          <ArrowBigUpDash className="arrow_up" size={35} strokeWidth={1} onClick={scrollToTop} />
        </button>

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
