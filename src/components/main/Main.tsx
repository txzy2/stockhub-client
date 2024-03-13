import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';
import {Search, SlidersHorizontal, X} from 'lucide-react';

const Main = () => {
  const {tg, onClose} = UseTg();
  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className='main'>
      <div className='main__search flex gap-2 justify-center items-center'>
        <div className='main__search--input flex gap-1.5 p-3.5'>
          <Search size={28} />
          <input
            className='main__search--input w-62 text-xl outline-none'
            placeholder='Поиск'
          ></input>
        </div>
        <a href='none' className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </a>
      </div>

      <button className='main__close' onClick={onClose}>
        <X size={32} />
      </button>
    </div>
  );
};

export default Main;
