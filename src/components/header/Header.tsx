import React from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';

const Header = () => {
  const {user} = UseTg();

  return (
    <div className='header'>
      <div className='header__user'>
        {/* <img
          src={user.photo_url}
          alt='user_photo'
          width={25}
          height={25}
          className='header__user--img'
        /> */}
        <div className=''>{user.photo_url}</div>
        <div className='header__user--name'>{user.first_name}</div>
      </div>
    </div>
  );
};

export default Header;
