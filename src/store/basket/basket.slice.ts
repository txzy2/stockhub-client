import {createSlice} from '@reduxjs/toolkit';
export type BasketItem = {
  id: number;
  name: string;
  price: number;
};

type BasketState = BasketItem[];

export const basketSlice = createSlice<BasketState, any, any, any>({
  name: 'basket',
  initialState: [] as BasketState,
  reducers: {
    toggleToBasket: (state: any[], {payload: product}: any) => {
      const isExists = state.some((item: any) => item.id === product.id);

      isExists
        ? (state = state.filter((item: any) => item.id !== product.id))
        : state.push(product);
    },
  },
});

export const {actions, reducer} = basketSlice;
