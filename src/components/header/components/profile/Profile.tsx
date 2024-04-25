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
import {UseTg} from '../../../../hooks/useTg';
import {ModalProps} from '../../../../types/types';

import './profile.scss';
import {userReq} from '../../../../hooks/fetchUser';

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
    userReq(user?.id ? user?.id.toString() : '', setUserData);
    // userReq('307777256', setUserData);
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
                {key !== 'basket' && (
                  <>
                    <div className='profile__info--icon'>
                      {iconMap[key]}
                      <span className='capitalize'>{key + ': '}</span>
                    </div>
                    <span>
                      {value === 'none'
                        ? '🚫'
                        : (value ?? 'Unknown').toString()}
                    </span>
                  </>
                )}
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
