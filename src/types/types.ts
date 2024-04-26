export type Variant = {
  size: string[];
  color: string;
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
  variants: Variant[];
};

export type ProductReceive = Product[];

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

export type ModalProps = {
  closeModal: () => void;
};
