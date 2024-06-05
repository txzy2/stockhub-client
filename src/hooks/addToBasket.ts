import axios from 'axios';
import {env_dev} from '../enviroments/env';

export const addToBasket = async (data: any) => {
  try {

    const {article, userId, size} = data;

    return axios.post(
      `${env_dev.host}/user/addToBasket`, {
        userId, size, article
      }
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};