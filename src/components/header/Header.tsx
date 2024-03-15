import React from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {CircleUser, Loader, ShoppingCart} from 'lucide-react';

const Header = () => {
  const {user} = UseTg();

  return (
    <div className='header'>
      <div className='flex justify-between mx-4 my-4'>
        <div className='flex items-center gap-1'>
          {user?.first_name !== undefined ? (
            <>
              <CircleUser size={32} />
              <span className='font-medium italic text-lg'>
                {user.first_name}
              </span>
            </>
          ) : (
            <>
              <Loader className='animate-spin-slow spinner' size={32} />
            </>
          )}
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
