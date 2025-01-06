export interface Address {
  street: string;
  city: string;
  zipcode: string;
  suite: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}
