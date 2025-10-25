
export type OrderItem = ProductListProps & {
  selectedSize: SizeType;
  quantity: number;
};


export type UserInputsProps = {
  name: string;
  email: string;
  password: string;
};

export type SizeType = "S" | "M" | "L" | "XL" | "XXL";

export type ProductListProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: SizeType[];
  bestseller: boolean;
  date: number;
  __v: number;
};

export type CartEntry = {
  _id: string;
  size: SizeType;
  quantity: number;
  product?: ProductListProps;
};

export type CartItemType = {
  [productId: string]: {
    [size in SizeType]?: number;
  };
};

export type OrderItemProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: { url: string; altText?: string }[];
};

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  payment: boolean;
  paymentMethod: string;
  status: string;
  date: number;
  __v?: number;
};

export type OrdersResponse = {
  success: boolean;
  orders: Order[];
};
