import React, {useEffect} from 'react';
import './App.scss';

import {Footer, Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import {images} from './assets/imagesAssets';
import {motion} from 'framer-motion';
import Typewriter from 'typewriter-effect';

const App = () => {
  const {tg, user} = UseTg();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className="App">
      <div className="background">
        <Circles />
      </div>
      {user?.id && tg.platform !== 'tdesktop' ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        <>
          <div className="main__load">
            <div className="error bold">
              <Typewriter
                onInit={typewriter => {
                  typewriter
                    .typeString(`StockHub12`)
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
            </div>

            <motion.div
              whileHover={{scale: 1.03}}
              transition={{type: 'spring', stiffness: 400, damping: 10}}
            >
              <a
                href="https://t.me/yokross_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="qr"
                  src={images.qr}
                  alt="qr"
                  width={300}
                  height={300}
                />
              </a>
            </motion.div>
            <div className="error">Эксклюзиво только в мобильном <a
              href={'https://t.me/stockhub12bot'}>Telegram</a></div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
