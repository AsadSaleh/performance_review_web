export interface Employee {
  id: number;
  name: string;
  email?: string;
  department?: string;
  city?: string;
}

export interface EditEmployee {
  name: string;
  email?: string;
  department?: string;
  city?: string;
}
