import axios from 'axios';

export const addOrderData = async (
  id: string,
  setOrderData: React.Dispatch<React.SetStateAction<any>>
) => {
  if (id) {
    try {
      const res = await axios.post(
        `https://stockhub12.ru:4200/api/user/addOrder`,
        {chat_id: id},
        {
          headers: {'Content-Type': 'application/json'}
        }
      );
      setOrderData(res.data);
    } catch (err) {
      setOrderData('');
    }
  }
};
