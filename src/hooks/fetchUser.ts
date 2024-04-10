import axios from 'axios';

export const userReq = async (
  chat_id: string,
  setUserData: React.Dispatch<React.SetStateAction<any>>
) => {
  if (chat_id) {
    try {
      const userFetch = await axios.post(
        `https://stockhub12.ru:4200/api/user/get`,
        {chat_id},
        {
          headers: {'Content-Type': 'application/json'},
        }
      );
      setUserData(userFetch.data);
    } catch (err) {
      setUserData(null);
    }
  } else {
    console.log('skip');
  }
};
