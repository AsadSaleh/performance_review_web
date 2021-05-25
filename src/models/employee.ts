export interface Employee {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  department?: string;
  address?: Address;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}