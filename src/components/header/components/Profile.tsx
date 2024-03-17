import {Check, CircleUser, Loader, X} from 'lucide-react';
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
    const userReq = async (chat_id: string) => {
      if (chat_id) {
        // console.log(chat_id, '\n', typeof chat_id);
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
          return null;
        }
      } else {
        console.log('skip');
      }
    };
    userReq(user?.id ? user?.id.toString() : '307777256');
  }, [tg, dispatch, user]);

  return (
    <>
      <a href='/' onClick={closeModal}>
        <X
          onClick={closeModal}
          className='absolute top-0 right-0 mt-5 mr-5'
          size={30}
        />
      </a>

      <div className='mt-16 ml-3 '>
        {userData ? (
          <div className='mt-4'>
            <div className='flex items-center justify-center gap-1'>
              <CircleUser size={32} />
              <h2 className='text-xl font-medium '>Твоя стата:</h2>
            </div>

            {Object.entries(userData).map(([key, value], index) => (
              <div className='flex mt-2 items-center gap-1' key={index}>
                <div className='flex items-center text-xl font-medium'>
                  {value === 'none' ? (
                    <X className='text-red-400' />
                  ) : (
                    <Check className='text-green-500' />
                  )}
                  {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                </div>
                <span className='italic text-lg'>
                  {value === 'none' ? '🚫' : value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className='inline-block align-text-bottom'>
            <Loader className='animate-spin-slow spinner' size={40} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
