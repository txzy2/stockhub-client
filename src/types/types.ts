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
  price?: string[];
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

type FiltersPrice = {
  from: string;
  to: string;
};

export type Filters = {
  var?: string;
  color?: string;
  brand?: string;
  locations?: string;
  priceRange?: FiltersPrice;
};

export type ModalProps = {
  closeModal: () => void;
};
