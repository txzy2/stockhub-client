import axios from 'axios';
import {env_dev} from '../enviroments/env';

export const addOrderData = async (
  paymentData: any
) => {
  if (paymentData) {
    try {
      const {chat_id, brand, model, amount} = paymentData;
      const transactionTitle = `Оплата${brand}${model}`;

      const res = await axios.post(
        `${env_dev.host}/user/addOrder`,
        {chat_id, transactionTitle, amount},
        {
          headers: {'Content-Type': 'application/json'}
        }
      );
      return res.data;
    } catch (err) {
      return null;
    }
  }
};
