import axios from 'axios';
import {env_dev} from '../enviroments/env';

export const deleteItemFromBasket = async (data: any) => {
  try {

    const {size, chat_id} = data;

    const res = await axios.delete(
      `${env_dev.host}/user/delItemBasket`, {data: {size, chat_id}}
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};