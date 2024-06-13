import {UseTg} from '../../hooks/useTg';
import {addOrderData} from '../../hooks/addOrderData';
import {ChevronRight} from 'lucide-react';
import React from 'react';

const OrderButton = ({
  amount,
  brand,
  model,
  article,
  size,
}: {
  amount: string | undefined;
  brand: string;
  model: string;
  article: string;
  size: string;
}) => {
  const {user} = UseTg();

  const handleOrderClick = async () => {
    const newAmount = amount?.replace(/\s+/g, '') ?? '0';
    // const data = localStorage.getItem(user?.id.toString());
    const data = localStorage.getItem('307777256');
    if (!data) {
      console.log('userData is null');
      return null;
    }
    const userData = JSON.parse(data);

    const paymentData = {
      // chat_id: userData.chat_id,
      chat_id: '307777256',
      brand,
      model,
      article,
      amount: newAmount,
      size,
    };

    const paymentUrl = await addOrderData(paymentData);

    if (!paymentUrl) {
      console.log('Ошибка запроса');
      return alert('Ошибка запроса');
    }
    window.location.href = paymentUrl;
  };

  return (
    <button
      style={{display: 'flex', alignItems: 'center'}}
      onClick={handleOrderClick}
    >
      Заказать <ChevronRight />
    </button>
  );
};

export default OrderButton;
