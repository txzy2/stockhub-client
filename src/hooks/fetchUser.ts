import axios from 'axios';
import {env_dev} from '../enviroments/env';

export const userReq = async (
  chat_id: string
) => {
  if (chat_id) {
    try {
      const userFetch = await axios.post(
        `${env_dev.host}/user/get`,
        {chat_id},
        {
          headers: {'Content-Type': 'application/json'}
        }
      );
      return userFetch.data;
    } catch (err) {
      return null;
    }
  } else {
    console.log('skip');
    return null;
  }
};
