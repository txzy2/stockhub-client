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
      {/* {user?.id ? ( */}
      {/* <> */}
      <div className='background'>
        <Circles />
      </div>
      <Header />
      <Main />
      {/* </>
      ) : (
        <>
          <div className='main__load'>
            <a
              className='main__load--link'
              href='https://t.me/yokross_bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={images.qr} alt='qr' width={560} height={560} />
            </a>
            <p>💀 Данная версия доступна только в телеграме</p>
          </div>
        </>
      )} */}
    </div>
  );
};

export default App;
