export interface CreateAddress {
  customerId: number;
  address1: string;
  address2?: string;
  city?: string;
  state: string;
  postCode?: string;
  addressType: number;
}
