import React from 'react';
import Typewriter from 'typewriter-effect';
import {motion} from 'framer-motion';

import './error.scss';
import {images} from '../../assets/imagesAssets';
import {Footer} from '../index';

const ErrorPage = () => {
  return (
    <>
      <div className="error__container">
        <div className="error__container--title">
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
        <div className="error__container--text">
          Эксклюзиво только в мобильной версии <span>Telegram</span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ErrorPage;
