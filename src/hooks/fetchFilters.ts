import {Filters, Product} from '../types/types';
import axios from 'axios';
import {env_dev} from '../enviroments/env';

const isEmptyValue = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.values(value).every(isEmptyValue);
  }
  return false;
};

const filterEmptyValues = (obj: any): any => {
  const result: any = {};
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      !isEmptyValue(obj[key])
    ) {
      result[key] = obj[key];
    }
  }
  return result;
};

// TODO: Сдлеать филтрацую на беке
export const FetchFilters = async (
  selectVar: string | null,
  params: Filters,
  setProductData: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const filteredParams = {var: selectVar, ...filterEmptyValues(params)};

  if (Object.keys(filteredParams).length > 0) {
    console.log('Filtered Params:', filteredParams);
    try {
      const res = await axios.get(
        `${env_dev.host}/product/get`,
        {
          params: filteredParams
        }
      );

      if (res.status === 200) {
        setProductData(res.data);
      }
    } catch (err) {
      console.log(err);
      setProductData([]);
    }
  }
};
