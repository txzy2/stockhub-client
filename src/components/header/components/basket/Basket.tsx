import {Loader, Trash2, X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';
import './basket.scss';
import React from 'react';

import {UseTg} from '../../../../hooks/useTg';
import OrderButton from '../../../orderButton/OrderButton';
import {deleteItemFromBasket} from '../../../../hooks/delItemFromBasket';

const DeleteItemBasketButton = ({
  size,
  article,
}: {
  size: string;
  article: string;
}) => {
  const {user} = UseTg();

  const handleOrderClick = async () => {
    const data = localStorage.getItem(user?.id.toString());

    if (!data) {
      console.log('userData is null');
      return null;
    }

    const userData = JSON.parse(data);

    const delData = {
      size: size,
      chat_id: userData.chat_id,
      article: article,
    };

    const deleteItem = await deleteItemFromBasket(delData);
    if (!deleteItem) {
      console.log('Error during request');
      return alert('Error during request');
    }

    window.location.reload();
  };

  return (
    <button
      style={{display: 'flex', alignItems: 'center'}}
      onClick={handleOrderClick}
    >
      <Trash2 size={20} />
    </button>
  );
};

const Basket = ({closeModal}: ModalProps) => {
  const {user} = UseTg();
  // const data = localStorage.getItem(user?.id.toString());
  const data = localStorage.getItem('307777256');
  if (!data) {
    return (
      <div className=''>
        <Loader className='animate-spin-slow spinner' size={20} />
      </div>
    );
  }
  const userData = JSON.parse(data);
  console.log(userData);

  return (
    <div className='basket'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      {/*TODO: Добавить удаление из корзины*/}

      {userData.basket.length > 0 ? (
        <div className='mt-14'>
          {userData.basket.map((item: any) => {
            const prices = item.product.variants
              .map((variant: any) => variant.price)
              .join(', ');
            return (
              <div key={item.id} className='basket__product'>
                <div className='basket__product--photo'>
                  <img
                    src={`https://stockhub12.ru/uploads/${item.product.article}/${item.product.photos[0]}`}
                    alt={`${item.product.name} ${item.product.brand} ${item.product.model}`}
                  />
                </div>

                <div className='basket__product_info'>
                  <p className='basket__product_info--title'>
                    {item.product.brand} {item.product.model}
                  </p>

                  <div>
                    <span className='font-medium'>Цвет: </span>{' '}
                    {item.product.variants
                      .map((variant: any) => variant.color)
                      .join(', ')}
                  </div>
                  <div>
                    <span className='font-medium'>Размер: </span> {item.size} us
                  </div>

                  <div className='basket__product_price'>{prices} ₽</div>

                  <div className='basket__product--btns'>
                    <div className='basket__product--btns__trash'>
                      <DeleteItemBasketButton
                        size={item.size}
                        article={item.article}
                      />
                    </div>

                    <div className='basket__product--btns__order'>
                      <OrderButton
                        amount={prices}
                        brand={item.product.brand}
                        model={item.product.model}
                        article={item.product.article}
                        size={item.size}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={'basket__title'}>Корзина пуста!</div>
      )}
    </div>
  );
};

export default Basket;
