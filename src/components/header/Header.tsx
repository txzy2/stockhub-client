import React, {useEffect, useState} from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, PackageOpen} from 'lucide-react';
import Profile from './components/profile/Profile';
import Basket from './components/basket/Basket';

const Header = () => {
  const {user, tg} = UseTg();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    toggleModalBodyClass(!isModalOpen);
  };

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
    toggleModalBodyClass(!isBasketOpen);
  };

  const toggleModalBodyClass = (isOpen: boolean) => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className='header'>
      <div className='header__user'>
        {user?.first_name ? (
          <button className='header__user--btn' onClick={toggleModal}>
            <CircleUser strokeWidth={1} size={32} />
            {user?.first_name}
          </button>
        ) : (
          <div className='header__load'>
            <Loader className='animate-spin-slow spinner' size={34} />
            <span className='header__load--emoji'>💀</span>
          </div>
        )}

        <div className='header__basket' onClick={toggleBasket}>
          <PackageOpen size={32} strokeWidth={1} />
          <span className='header__basket--count'>2</span>
        </div>
      </div>

      <AnimatePresence>
        {(isModalOpen || isBasketOpen) && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='modal'
          >
            {isModalOpen && <Profile closeModal={toggleModal} />}
            {isBasketOpen && <Basket closeModal={toggleBasket} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
