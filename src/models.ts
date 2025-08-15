// Data models
export type Customer = {
  accountNumber: string;
  name: string;
  email: string;
  phoneNumber: string;
  unitConsumed: number;
  isActive: boolean;
};

export type Item = {
  id: number;
  name: string;
  category: string;
  qty: number;
  price: number;
};

export type BillItem = {
  billItemId: string;
  billId: string;
  itemId: string;
  qty: number;
  price: number;
};

export type Bill = {
  billId: string;
  accountNumber: string;
  billDate: string;
  total: number;
  items: BillItem[];
};

export type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
};
