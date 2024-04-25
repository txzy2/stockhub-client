import {
  BookCheck,
  Coins,
  Loader,
  Mail,
  MapPin,
  PackageOpen,
  User,
  X,
} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {UseTg} from '../../../../hooks/useTg';
import {ModalProps} from '../../../../types/types';

import './profile.scss';
import {userReq} from '../../../../hooks/fetchUser';

const iconMap: Record<string, React.ReactElement> = {
  locale: <MapPin size={32} strokeWidth={1} />,
  email: <Mail size={32} strokeWidth={1} />,
  fio: <User size={32} strokeWidth={1} />,
  bonus: <Coins size={32} strokeWidth={1} />,
  orders: <PackageOpen size={32} strokeWidth={1} />,
};

const Profile = ({closeModal}: ModalProps) => {
  const {tg, user} = UseTg();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // userReq(user?.id ? user?.id.toString() : '', setUserData);
    userReq('307777256', setUserData);
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

            <div className='profile__details'>
              <div className='profile__details--stat'>
                <div className='profile__details--stat_container'>
                  <label className='italic' htmlFor=''>
                    Заказы
                  </label>
                  <div className='profile__details--stat_container-info'>
                    <span>{iconMap.orders}</span>
                    <span>{userData.orders}</span>
                  </div>
                </div>

                <div className='profile__details--stat_container'>
                  <label className='italic' htmlFor=''>
                    Бонусы
                  </label>
                  <div className='profile__details--stat_container-info'>
                    <span>{iconMap.bonus}</span>
                    <span>{userData.bonus}</span>
                  </div>
                </div>
              </div>

              <hr className='profile__details--line' />

              <p className='profile__details--subtitle'>Личные данные</p>

              <div className='profile__details--user'>
                <div className='profile__details--user_container'>
                  <span>{iconMap.fio}</span>
                  <span>{userData.fio}</span>
                </div>

                <div className='profile__details--user_container'>
                  <span>{iconMap.email}</span>
                  <span className='border_bottom'>{userData.email}</span>
                </div>

                <div className='profile__details--user_container'>
                  <span>{iconMap.locale}</span>
                  <span>{userData.locale}</span>
                </div>
              </div>
            </div>
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
