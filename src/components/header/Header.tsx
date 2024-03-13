import React from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {CircleUser, ShoppingCart} from 'lucide-react';

const Header = () => {
  const {user} = UseTg();

  return (
    <div className='header'>
      <div className='flex justify-between mx-4 my-4'>
        <div className='flex items-center gap-1'>
          <CircleUser size={32} />
          <span className='font-medium italic text-lg'>
            {user?.first_name !== undefined ? user.first_name : 'Undefined'}
          </span>
        </div>

        <div className='flex items-center gap-1'>
          <ShoppingCart size={32} />
          <span className='italic text-xl pt-6'>2</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
