import React from "react";
import { RouteComponentProps } from "react-router";
import { createPerformanceReview } from "../../repositories/perfReviewRepository";
import PerformanceReviewForm, {
  PerformanceReviewFormValues,
} from "./components/PerformanceReviewForm";

export default function PerformanceReviewCreateScreen(
  props: RouteComponentProps
) {
  async function handleSubmit(pr: PerformanceReviewFormValues) {
    try {
      await createPerformanceReview({
        TargetEmployeeId: pr.targetEmployee.id,
        ReviewerIds: pr.reviewers.map((e) => e.id),
      });
      props.history.push("/performance-review");
    } catch (error) {}
  }
  return (
    <div className="mt-2">
      <h3>Create Performance Review</h3>
      <PerformanceReviewForm onSubmit={handleSubmit} />
    </div>
  );
}
