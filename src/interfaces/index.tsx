export interface IBill {
  _id?: string;
  billNo: string;
  item: string;
  quantity: number;
  vendor: string;
}

export interface IItem {
  _id?: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface IErrorsItem {
  name: boolean;
  price: boolean;
}
