import {useEffect, useState} from 'react';
import Typewriter from 'typewriter-effect';
import './header.scss';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, PackageOpen} from 'lucide-react';
import Profile from './components/profile/Profile';
import Basket from './components/basket/Basket';
import {UseTg} from '../../hooks/useTg';
import {userReq} from '../../hooks/fetchUser';
import {UserReciveDto} from '../../types/types';

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

      // const fetchedUserData = await userReq('307777256');
      // localStorage.setItem('307777256', JSON.stringify(fetchedUserData));

      const fetchedUserData = await userReq(user?.id.toString());
      localStorage.setItem(user?.id.toString(), JSON.stringify(fetchedUserData));

      setUserData(fetchedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem(user?.id.toString());
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));

      console.log(userData);
    } else {
      userGet();
    }
    const handleBeforeUnload = () => {
      localStorage.removeItem(user?.id.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const openBasket = () => {
    setBasket(true);
    setIsModalOpen(false);
    document.body.classList.add('modal-open');
  };

  const closeBasket = () => {
    setBasket(false);
    document.body.classList.remove('modal-open');
  };

  const openModal = () => {
    setIsModalOpen(true);
    setBasket(false);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <header className="header">
      <div className="header__user">
        {userData ? (
          <motion.div
            whileHover={{scale: 1.1}}
            transition={{type: 'spring', stiffness: 400, damping: 10}}
            id="main"
          >
            <button className="header__user--btn" onClick={openModal}>
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
          <div className="header__load">
            <span className="header__load--emoji">💀</span>
            <Loader className="animate-spin-slow spinner" size={30} />
          </div>
        )}

        <motion.div
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', stiffness: 400, damping: 10}}
          id="main"
        >
          <div className="header__basket" onClick={openBasket}>
            <PackageOpen size={32} strokeWidth={1} />
            <span className="header__basket--count">
              {userData ? (
                userData?.basket
              ) : (
                <div className="header__load">
                  <Loader className="animate-spin-slow spinner" size={20} />
                </div>
              )}
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{opacity: 0, x: -1000}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -1000}}
            transition={{duration: 0.5}}
            className="modal-left"
          >
            <Profile closeModal={closeModal} />
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
            className="modal"
          >
            <Basket closeModal={closeBasket} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
