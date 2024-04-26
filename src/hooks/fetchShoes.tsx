import axios from 'axios';

export const fetchShoes = async (
  shoe: string,
  setShoeData: React.Dispatch<React.SetStateAction<any>>,
) => {
  if (shoe) {
    try {
      const res = await axios.post(
        `https://stockhub12.ru:4200/api/product/getAll`,
        { var: shoe },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log('Response data:', res.data);
      setShoeData(res.data);
    } catch (err) {
      setShoeData(null);
    }
  }
};
