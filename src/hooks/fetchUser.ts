import axios from 'axios';

export const userReq = async (
  chat_id: string
) => {
  if (chat_id) {
    try {
      const userFetch = await axios.post(
        `https://stockhub12.ru:4200/api/user/get`,
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
