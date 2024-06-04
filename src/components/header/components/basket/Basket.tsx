import {Loader, X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';

import './basket.scss';
import React from 'react';
import {OrderButton} from '../../../main/components/Card/Card';
import {UseTg} from '../../../../hooks/useTg';

const Basket = ({closeModal}: ModalProps) => {
  const {user} = UseTg();
  const data = localStorage.getItem(user?.id.toString());
  if (!data) {
    return (
      <div className="">
        <Loader className="animate-spin-slow spinner" size={20} />
      </div>
    );
  }
  const userData = JSON.parse(data);

  console.log(userData.basket.map((item: any) => item.product));

  return (
    <div className="basket">
      <button type="button" onClick={closeModal}>
        <X className="exit" size={30} />
      </button>

      {userData.basket.length > 0 ? (
        <div className="mt-14">
          {userData.basket.map((item: any) => {
            const prices = item.product.variants.map((variant: any) => variant.price).join(', ');
            return (
              <div key={item.id} className="basket__product">
                <div className="basket__product--photo">
                  <div key={item.product.photos[0]}>
                    <img
                      src={`https://stockhub12.ru/uploads/${item.product.article}/${item.product.photos[0]}`}
                      alt={`${item.product.name} ${item.product.brand} ${item.product.model}`}
                    />
                  </div>
                </div>

                <div className="basket__product_info">
                  <p className="basket__product_info--title">
                    {item.product.brand} {item.product.model}
                  </p>

                  <div>
                    <span className="font-medium">Цвет: </span>{' '}
                    {item.product.variants.map((variant: any) => variant.color).join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Размер: </span>{' '}
                    {item.size} us
                  </div>

                  <div className="basket__product_price">
                    {prices} ₽
                  </div>

                  <div className="basket__product--btn">
                    <OrderButton
                      amount={prices}
                      brand={item.product.brand}
                      model={item.product.model}
                      article={item.product.article}
                      size={item.size}
                      disabled={false}
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={'basket__title'}>
          Корзина пуста!
        </div>
      )}
    </div>
  );
};

export default Basket;
