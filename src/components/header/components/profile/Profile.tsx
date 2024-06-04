import {Coins, Loader, Mail, MapPin, PackageOpen, User, X} from 'lucide-react';
import React from 'react';

import './profile.scss';
import {UseTg} from '../../../../hooks/useTg';

const iconMap: Record<string, React.ReactElement> = {
  locale: <MapPin size={32} strokeWidth={1} />,
  email: <Mail size={32} strokeWidth={1} />,
  fio: <User size={32} strokeWidth={1} />,
  bonus: <Coins size={32} strokeWidth={1} />,
  orders: <PackageOpen size={32} strokeWidth={1} />
};

const Profile = (
  {closeModal}: {
    closeModal: () => void,
  }
) => {
  const {user} = UseTg();
  const data = localStorage.getItem(user?.id.toString());
  // const data = localStorage.getItem('307777256');

  if (!data) {
    console.log('userData is null');
    return (
      <div className="profile__load">
        <Loader className="animate-spin-slow spinner" size={40} />
      </div>
    );
  }

  const userData = JSON.parse(data);

  return (
    <>
      <button type="button" onClick={closeModal}>
        <X className="exit" size={30} />
      </button>

      <div className="profile">
        <h2 className="profile__username">
          {userData.username}
        </h2>

        <div className="profile__details">
          <div className="profile__details--stat">
            <div className="profile__details--stat_container">
              <label className="italic">
                Заказы
              </label>
              <div className="profile__details--stat_container-info">
                <span>{iconMap.orders}</span>
                <span>{userData?.orders}</span>
              </div>
            </div>

            <div className="profile__details--stat_container">
              <label className="italic">
                Бонусы
              </label>
              <div className="profile__details--stat_container-info">
                <span>{iconMap.bonus}</span>
                <span>{userData?.bonus}</span>
              </div>
            </div>
          </div>

          <hr className="profile__details--line" />

          <p className="profile__details--subtitle">Личные данные</p>

          <div className="profile__details--user">
            <div className="profile__details--user_container">
              <span>{iconMap.fio}</span>
              <span>
                    {userData.fio !== 'none' ? userData.fio : 'Пусто'}
                  </span>
            </div>

            <div className="profile__details--user_container">
              <span>{iconMap.email}</span>
              <span className="border_bottom">
                    {userData.email !== 'none' ? userData.email : 'Пусто'}
                  </span>
            </div>

            <div className="profile__details--user_container">
              <span>{iconMap.locale}</span>
              <span>
                    {userData.locale !== 'none' ? userData.locale : 'Пусто'}
                  </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
