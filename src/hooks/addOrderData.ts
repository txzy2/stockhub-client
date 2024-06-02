import axios from 'axios';
import {env_dev} from '../enviroments/env';

export const addOrderData = async (
  paymentData: any
) => {
  if (paymentData) {
    try {
      const {chat_id, brand, model, article, amount, size} = paymentData;
      const transactionTitle = `Оплата ${brand} ${model} (${article}) ${size} us`;

      const res = await axios.post(
        `${env_dev.host}/user/addOrder`,
        {chat_id, transactionTitle, amount, article, size},
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
