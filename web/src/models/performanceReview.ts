import { Employee } from "./employee";

export interface PerformanceReview {
  id: number;
  targetEmployee: Employee;
  reviewers: Employee[];
  status: "pending" | "completed";
}

export interface CreatePerformanceReviewPayload {
  target_employee_id: number;
  reviewers_id: number[];
}

export interface PerformanceReviewValue {
  id: number;
  targetEmployee: Employee;
  reviewer: Employee;
  status: "pending" | "completed";
  values: QuestionValue[];
}

interface QuestionValue {
  question: string;
  value: number;
}
