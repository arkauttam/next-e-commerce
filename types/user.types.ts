export type User = any


export interface Account {
  account_first_name: string;
  account_last_name: string;
  account_email: string;
  account_phone: string;
  account_status: string;
  role: number;
}

export interface Address {
  address: string;
  address_city: string;
  address_state: string;
  address_pin_code: string;
  address_country: any;
}
