import {useEffect, useState} from 'react';
import Typewriter from 'typewriter-effect';
import './header.scss';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, PackageOpen} from 'lucide-react';
import Profile from './components/profile/Profile';
import Basket from './components/basket/Basket';
import {UseTg} from '../../hooks/useTg';
import {UserReciveDto} from '../../types/types';
import {userReq} from '../../hooks/fetchUser';

const Header = () => {
  const {user} = UseTg();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBasketOpen, setBasket] = useState(false);
  const [userData, setUserData] = useState<UserReciveDto>();

  const userGet = async () => {
    try {
      if (!user?.id) {
        setUserData(undefined);
        return;
      }

      const fetchedUserData = await userReq(user?.id.toString());
      localStorage.setItem(
        user?.id.toString(),
        JSON.stringify(fetchedUserData)
      );

      console.log(fetchedUserData);
      setUserData(fetchedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    userGet();
  }, []);

  const toggleBasketModal = () => {
    const newBasketState = !isBasketOpen;
    setBasket(newBasketState);
    setIsModalOpen(false);
    document.body.classList.toggle('modal-open', newBasketState);
  };

  const toggleProfileModal = () => {
    const newModalState = !isModalOpen;
    setIsModalOpen(newModalState);
    setBasket(false);
    document.body.classList.toggle('modal-open', newModalState);
  };
  return (
    <header className='header'>
      <div className='header__user'>
        {userData ? (
          <motion.div
            whileHover={{scale: 1.1}}
            transition={{type: 'spring', stiffness: 400, damping: 10}}
            id='main'
          >
            <button className='header__user--btn' onClick={toggleProfileModal}>
              <CircleUser strokeWidth={1} size={32} />
              <Typewriter
                onInit={typewriter => {
                  typewriter
                    .typeString(`${userData?.username}`)
                    .start()
                    .callFunction(() => {
                      (
                        document.getElementsByClassName(
                          'Typewriter__cursor'
                        )[0] as HTMLElement
                      ).style.display = 'none';
                    });
                }}
              />
            </button>
          </motion.div>
        ) : (
          <div className='header__load'>
            <span className='header__load--emoji'>💀</span>
            <Loader className='animate-spin-slow spinner' size={30} />
          </div>
        )}

        <motion.div
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', stiffness: 400, damping: 10}}
          id='main'
        >
          <button
            className='header__basket'
            disabled={!userData}
            onClick={toggleBasketModal}
          >
            <PackageOpen size={32} strokeWidth={1} />
            <span className='header__basket--count'>
              {userData ? (
                <div>{userData?.basket.length}</div>
              ) : (
                <Loader className='animate-spin-slow spinner' size={20} />
              )}
            </span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{opacity: 0, x: -1000}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -1000}}
            transition={{duration: 0.5}}
            className='modal-left'
          >
            <Profile closeModal={toggleProfileModal} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBasketOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='modal'
          >
            <Basket closeModal={toggleBasketModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
