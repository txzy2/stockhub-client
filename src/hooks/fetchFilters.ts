import {Filters} from '../types/types';
import axios from 'axios';

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
    if (Object.prototype.hasOwnProperty.call(obj, key) && !isEmptyValue(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
};


// TODO: Сдлеать филтрацую на беке
export const FetchFilters = async (params: Filters) => {

  const filteredParams = filterEmptyValues(params);

  if (Object.keys(filteredParams).length > 0) {
    console.log(filteredParams);

    try {
      const res = await axios.post(
        `https://stockhub12.ru:4200/api/product/get`,
        {filteredParams},
        {
          headers: {'Content-Type': 'application/json'}
        }
      );

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
};