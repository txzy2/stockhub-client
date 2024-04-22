import React, {useEffect} from 'react';
import './App.scss';

import {Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import {images} from './assets/imagesAssets';

const App = () => {
  const {tg, user} = UseTg();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className='App'>
      {user?.id ? (
        <>
          <div className='background'>
            <Circles />
          </div>
          <Header />
          <Main />
        </>
      ) : (
        <>
          <div className='background'>
            <Circles />
          </div>

          <div className='main__load'>
            <a
              href='https://t.me/yokross_bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='qr'
                src={images.qr}
                alt='qr'
                width={300}
                height={300}
              />
            </a>
            <p className='error'>Используй Telegram ;)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
