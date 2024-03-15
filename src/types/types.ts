export type sizes = {
  id: number;
  size: string;
};

export type ProductReciveDto = {
  id: number;
  name: string;
  brand: string;
  material: string;
  color: string;
  size: sizes[];
  photo: string;
};

export type ProductRecive = {
  product: ProductReciveDto[];
};

export type UserReciveDto = {
  id: number;
  chat_id: string;
  username: string;
  email: string;
  fio: string;
  locale: string;
  bonus: number;
  orders: number;
};

export type UserRecive = {
  user: UserReciveDto[];
};
