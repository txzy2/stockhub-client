import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';
import {Search, SlidersHorizontal} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../store/user/user.slice';
import {RootState} from '../../store/store';

const Main = ({product}: {product: any}) => {
  const {tg, user} = UseTg();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    tg.ready();
    tg.expand();
    const userReq = async () => {
      if (user && user.id !== undefined) {
        const chat_id = `${user.id}`;
        try {
          const userFetch = await axios.post(
            `http://94.228.124.88:4200/api/user/get`,
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
        console.log('User ID is undefined, skipping request');
      }
    };
    userReq();
  }, [tg, user, dispatch]);

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
        <a href='none' className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </a>
      </div>
      <div className=''>{product.name}</div>

      <div className='text-black'>
        {userData && (
          <>
            <p>
              Full Name: {userData.fio === 'none' ? 'Нет данных' : userData.fio}
            </p>
            <p>
              Email: {userData.email === 'none' ? 'Нет данных' : userData.email}
            </p>
            <p>
              Locale:{' '}
              {userData.locale === 'none' ? 'Нет данных' : userData.locale}
            </p>
            <p>Bonus: {userData.bonus}</p>
            <p>Orders: {userData.orders}</p>
          </>
        )}
      </div>

      {/* <div className='text-black'>
        {user && user.id !== undefined ? (
        <p>Full Name: {userData.fio}</p>
        <p>Bonus: {userData.bonus}</p>
        <p>Orders: {userData.orders}</p>
        ) : (
          <p>User ID is undefined</p>
        )}
      </div> */}
    </div>
  );
};

export default Main;
