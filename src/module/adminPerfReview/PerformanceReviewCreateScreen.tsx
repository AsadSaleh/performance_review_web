import React from "react";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { createPerformanceReview } from "../../repositories/perfReviewRepository";
import BaseLayout from "../../ui_components/BaseLayout";
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
      toast(
        <div>
          <div>Success!</div>
          <div className="text-sm">
            Created performance review for {pr.targetEmployee.name}
          </div>
        </div>,
        { type: "success" }
      );
    } catch (error) {
      toast(
        <div>
          <div>Error!</div>
          <div className="text-sm">Failed to create performance review</div>
        </div>,
        { type: "error" }
      );
    }
  }
  return (
    <BaseLayout title="Create New Performance Review">
      <PerformanceReviewForm onSubmit={handleSubmit} />
    </BaseLayout>
  );
}
