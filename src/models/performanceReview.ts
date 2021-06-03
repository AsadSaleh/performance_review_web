import { Employee } from "./employee";

interface PerformanceReviewAnswer {
  Question: {
    id: number;
    text: string;
  };
  Choice: {
    id: number;
    text: string;
    value: number;
  };
}

export interface FlatPerformanceReview {
  id: number;
  TargetEmployee: Employee;
  Reviewer: Employee;
  status: "pending" | "completed";
  PerformanceReviewAnswers: PerformanceReviewAnswer[];
}

export interface PerformanceReview {
  id: number;
  targetEmployee: Employee;
  reviewers: Employee[];
  status: "pending" | "completed";
}

export interface CreatePerformanceReviewPayload {
  TargetEmployeeId: number;
  ReviewerIds: number[];
}

export interface EditPerformanceReviewPayload {
  ReviewerId: number;
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
