import React, {useEffect, useState} from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, PackageOpen} from 'lucide-react';
import Profile from './components/Profile';

const Header = () => {
  const {user, tg} = UseTg();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className='header'>
      <div className='header__user'>
        {user?.first_name ? (
          <button className='header__user--btn' onClick={openModal}>
            <CircleUser strokeWidth={1} size={32} />
            {user?.first_name}
          </button>
        ) : (
          <div className='header__load'>
            <Loader className='animate-spin-slow spinner' size={34} />
            <span className='header__load--emoji'>💀</span>
          </div>
        )}

        <div className='header__basket'>
          <PackageOpen size={32} strokeWidth={1} />
          <span className='header__basket--count'>2</span>
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
            <Profile closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
