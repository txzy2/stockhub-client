import axios from 'axios';
import {Product} from '../types/types';

export const fetchShoes = async (
  shoe: string,
  setShoeData: React.Dispatch<React.SetStateAction<Product[]>>,
) => {
  if (shoe) {
    try {
      const res = await axios.post(
        `https://stockhub12.ru:4200/api/product/getAll`,
        {var: shoe},
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      setShoeData(res.data);
    } catch (err) {
      setShoeData([]);
    }
  }
};
