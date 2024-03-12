import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';

const Main = () => {
  const {tg, onClose} = UseTg();
  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className=''>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default Main;
