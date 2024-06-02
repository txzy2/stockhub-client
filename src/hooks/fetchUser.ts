import axios from 'axios';
import {env_dev} from '../enviroments/env';

type userGet = {
  chat_id: string;
}

export const userReq = async (
  chat_id: userGet['chat_id']
) => {
  if (chat_id) {
    try {
      const userFetch = await axios.get(`${env_dev.host}/user/get`, {
        params: {chat_id}
      });
      return userFetch.data;
    } catch (err) {
      return null;
    }
  } else {
    console.log('skip');
    return null;
  }
};
