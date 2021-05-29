import { Employee } from "./employee";

export interface PerformanceReview {
  id: number;
  target: Employee;
  reviewers: Employee[];
  status: PerformanceReviewStatus;
}

export enum PerformanceReviewStatus {
  uncompleted,
  completed,
}
