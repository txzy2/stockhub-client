import React, {useEffect} from 'react';
import './main.scss';

declare const window: any;
const tg = window.Telegram.WebApp;

const Main = () => {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className=''>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default Main;
