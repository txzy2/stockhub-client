export type Variant = {
  size?: string[];
  color?: string;
  price?: string;
};

export type Product = {
  article: string;
  brand: string;
  createdAt: string;
  id: number;
  material: string;
  model: string;
  name: string;
  photos: string[];
  updatedAt: string;
  var: string;
  size?: string[];
  color?: string[];
  price?: string;
};

export type ProductReceive = Product[];

export type ProductRequestFilter = {
  article?: string;
  brand?: string;
  createdAt?: string;
  id?: number;
  material?: string;
  model?: string;
  name?: string;
  photos?: string[];
  updatedAt?: string;
  var?: string;
  variants?: Variant[];
};

export type UserBasket = {
  id: number,
  createdAt: string,
  updatedAt: string,
  article: string,
  userId: string,
}

export type UserReciveDto = {
  id: number;
  chat_id: string;
  username: string;
  email: string;
  fio: string;
  locale: string;
  bonus: number;
  orders: number;
  basket: UserBasket[];
};

export type UserRecive = {
  user: UserReciveDto[];
};

export type UserResponse = {
  locale: string;
  email: string;
  fio: string;
  orders: number;
  bonus: number;
};

type FiltersPrice = {
  from: string;
  to: string;
};

export type Filters = {
  var?: string;
  color?: string;
  brand?: string;
  size?: string;
  material?: string;
  locations?: string;
  priceRange?: FiltersPrice;
};

export type UserOreder = {
  amount: string,
  email: string,
  brand: string,
  model: string,
  order_id: string,
}

export type ModalProps = {
  closeModal: () => void;
};
