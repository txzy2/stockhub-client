import {
  BookCheck,
  Coins,
  Loader,
  Mail,
  MapPin,
  PackageOpen,
  X,
} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {UseTg} from '../../../hooks/useTg';
import {ModalProps} from '../../../types/types';

import './profile.scss';

const iconMap: Record<string, React.ReactElement> = {
  locale: <MapPin size={32} strokeWidth={1} />,
  email: <Mail size={32} strokeWidth={1} />,
  fio: <BookCheck size={32} strokeWidth={1} />,
  bonus: <Coins size={32} strokeWidth={1} />,
  orders: <PackageOpen size={32} strokeWidth={1} />,
};

const Profile = ({closeModal}: ModalProps) => {
  const {tg, user} = UseTg();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const userReq = async (chat_id: string) => {
      if (chat_id) {
        try {
          const userFetch = await axios.post(
            `https://stockhub12.ru:4200/api/user/get`,
            {chat_id},
            {
              headers: {'Content-Type': 'application/json'},
            }
          );
          setUserData(userFetch.data);
        } catch (err) {
          setUserData(null);
        }
      } else {
        console.log('skip');
      }
    };
    userReq(user?.id ? user?.id.toString() : '307777256');
  }, [tg, user]);

  return (
    <>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className='profile'>
        {userData !== null ? (
          <>
            <h2 className='profile__username'>
              {user?.first_name ? user.first_name : 'Anton'}
            </h2>

            {Object.entries(userData).map(([key, value], index) => (
              <div className='profile__info' key={index}>
                <div className='profile__info--icon'>
                  {iconMap[key]}
                  <span className='capitalize'>{key}:</span>
                </div>
                <span>
                  {value === 'none'
                    ? '🚫'
                    : ('✅' + value ?? 'Unknown').toString()}
                </span>
              </div>
            ))}
          </>
        ) : (
          <div className='profile__load'>
            <Loader className='animate-spin-slow spinner' size={40} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
