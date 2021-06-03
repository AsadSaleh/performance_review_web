export interface Employee {
  id: number;
  name: string;
  email?: string;
  department?: string;
  city?: string;
  role?: "admin" | "employee";
}

export type EditEmployee = Omit<Employee, "id">;
