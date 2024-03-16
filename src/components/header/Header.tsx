import React, {useEffect, useState} from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, ShoppingCart} from 'lucide-react';
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
  }, [tg]);

  return (
    <div className='header'>
      <div className='flex justify-between mx-4 my-4'>
        <button className='flex gap-1' onClick={openModal}>
          <CircleUser size={32} />
          {user?.first_name !== undefined ? (
            <>
              <p className='font-medium italic text-lg'>{user?.first_name}</p>
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    initial={{opacity: 0, y: 1000}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 1000}}
                    transition={{duration: 0.5}}
                    className='fixed inset-0 modal'
                  >
                    <Profile closeModal={closeModal} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Loader className='animate-spin-slow spinner' size={32} />
            </>
          )}
        </button>

        <div className='flex items-center gap-1'>
          <ShoppingCart size={32} />
          <span className='italic text-xl pt-6'>2</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
