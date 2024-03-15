import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';
import {Loader, Search, SlidersHorizontal} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../store/user/user.slice';
import {RootState} from '../../store/store';

const Main = () => {
  const {tg, user} = UseTg();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    tg.ready();
    tg.expand();
    const userReq = async (chat_id: string) => {
      if (chat_id !== undefined) {
        console.log(chat_id, '\n', typeof chat_id);
        try {
          const userFetch = await axios.post(
            `https://stockhub12.ru:4200/api/user/get`,
            {chat_id},
            {
              headers: {'Content-Type': 'application/json'},
            }
          );
          console.log('userFetch data:', userFetch.data);
          dispatch(setUser(userFetch.data));
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('skip');
      }
    };
    userReq(user?.id.toString());
  }, [tg, dispatch, user]);

  return (
    <div className='main'>
      <div className='main__search flex gap-2 justify-center items-center'>
        <div className='main__search--input flex gap-1.5 p-3.5'>
          <Search size={28} />
          <input
            className='main__search--input_text w-62 text-xl outline-none'
            placeholder='Поиск'
          ></input>
        </div>
        {/* TODO: Скорее всего будет button */}
        <a href='none' className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </a>
      </div>

      <div className='gap-2 ps-4 pt-3'>
        <h2 className='text-xl font-medium'>Твоя стата (тест):</h2>
        {userData ? (
          Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
              {value === 'none' ? 'Данные не заполнены' : value}
            </p>
          ))
        ) : (
          <div className='flex items-center'>
            <Loader className='animate-spin-slow spinner' size={32} />
            <span className='text-lg'>Loading</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
