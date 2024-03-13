import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';
import {X} from 'lucide-react';

const Main = () => {
  const {tg, onClose} = UseTg();
  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className='main'>
      <button className='main__close' onClick={onClose}>
        <X size={32} />
      </button>
    </div>
  );
};

export default Main;
