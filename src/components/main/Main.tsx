import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';

const Main = () => {
  const {tg, onClose} = UseTg();
  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className='main'>
      <button className='main__close' onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Main;
