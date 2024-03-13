import React from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {CircleUser, ShoppingCart} from 'lucide-react';

const Header = () => {
  const {user} = UseTg();

  return (
    <div className='header'>
      <div className='header__user'>
        <div className='header__user_info'>
          <CircleUser size={32} />
          <span className='header__user_info--name'>{user.first_name}</span>
          {/* <span className='header__user_info--name'>Anton</span> */}
        </div>

        <div className='header__user_basket'>
          <ShoppingCart size={32} />
          <div className='header__user_basket--count'>2</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
