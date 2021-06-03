export interface Employee {
  id: number;
  name: string;
  email?: string;
  department?: string;
  city?: string;
  role?: string;
}

export interface EditEmployee {
  name: string;
  email?: string;
  department?: string;
  city?: string;
}
