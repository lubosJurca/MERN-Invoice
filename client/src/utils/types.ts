interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  _id?: string;
}

export type CreateInvoiceType = {
  createdAt: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: 'paid' | 'pending' | 'draft';
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
  dueDate: Date;
};

export interface InvoiceType extends CreateInvoiceType {
  _id?: string;
}

export type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserTypes = {
  email: string;
  password: string;
};

export type StatusTypes = {
  status: 'pending' | 'paid' | 'draft';
};
