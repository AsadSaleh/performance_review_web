export declare interface Employee {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  department?: string;
  city?: string;
}

export interface PerformanceReview {
  id: number;
  targetEmployee: Employee;
  reviewers: Employee[];
  status: "pending" | "completed";
}
