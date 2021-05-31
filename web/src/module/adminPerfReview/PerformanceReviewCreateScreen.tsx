import React from "react";
import { Container } from "reactstrap";
import { createPerformanceReview } from "../../repositories/perfReviewRepository";
import PerformanceReviewForm, {
  PerformanceReviewFormValues,
} from "./components/PerformanceReviewForm";

export default function PerformanceReviewCreateScreen() {
  function handleSubmit(pr: PerformanceReviewFormValues) {
    createPerformanceReview({
      target_employee_id: pr.targetEmployee.id,
      reviewers_id: pr.reviewers.map((e) => e.id),
    });
  }
  return (
    <Container fluid className="mt-2">
      <h3>Create Performance Review</h3>
      <PerformanceReviewForm onSubmit={handleSubmit} />
    </Container>
  );
}
