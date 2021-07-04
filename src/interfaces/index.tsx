export interface IBill {
  _id?: string;
  billNo: string;
  itemId: IItem;
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

export interface ILogin {
  email: string;
  password: string;
}
