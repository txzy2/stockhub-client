import React, {useEffect, useState} from 'react';
import './App.scss';

import {Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import {images} from './assets/imagesAssets';
import {Loader} from 'lucide-react';

const App = () => {
  const {tg, user} = UseTg();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await tg.ready(); // Предполагая, что tg.ready() возвращает промис
        tg.expand();
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки ресурсов:', error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, [tg, user]);

  if (isLoading) {
    return (
      <div className='App'>
        <div className='background'>
          <Circles />
        </div>

        <Loader className='animate-spin-slow spinner' size={20} />
      </div>
    );
  }

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
            <p className='error bold'>StockHub12</p>
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
            <p className='error'>Эксклюзиво только в Telegram</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
