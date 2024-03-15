import {Loader, X} from 'lucide-react';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../../store/user/user.slice';
import {RootState} from '../../../store/store';
import {UseTg} from '../../../hooks/useTg';

type ModalProps = {
  closeModal: () => void;
};

const Profile = ({closeModal}: ModalProps) => {
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
    <div className='profile'>
      <a href='/'>
        <X
          onClick={closeModal}
          className='absolute top-0 right-0 mt-5 mr-5'
          size={36}
        />
      </a>

      <div className='mt-16'>
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

export default Profile;
