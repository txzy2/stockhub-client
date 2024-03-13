import React from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';

const Header = () => {
  const {user} = UseTg();
  return (
    <div className='header'>
      <div className='header__user'>{user}</div>
    </div>
  );
};

export default Header;
