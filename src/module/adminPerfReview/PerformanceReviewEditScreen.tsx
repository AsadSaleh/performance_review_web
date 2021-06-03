import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { FlatPerformanceReview } from "../../models/performanceReview";
import {
  getPerformanceReview,
  // updatePerformanceReview,
} from "../../repositories/perfReviewRepository";
// import { PerformanceReviewFormValues } from "./components/PerformanceReviewForm";

export default function PerformanceReviewEditScreen(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  const [pr, setPr] = useState<FlatPerformanceReview | null>(null);

  useEffect(() => {
    async function getData() {
      const res = await getPerformanceReview(+id);
      setPr(res);
    }
    getData();
  }, [id]);

  // function handleSubmit(pr: PerformanceReviewFormValues) {
  //   updatePerformanceReview(+id, {
  //     TargetEmployeeId: pr.targetEmployee.id,
  //     ReviewerIds: pr.reviewers.map((e) => e.id),
  //   });
  // }

  if (pr === null) {
    return <div>Data not available</div>;
  }

  return (
    <div className="mt-2">
      <h3>Edit Performance Review</h3>
      {/* <PerformanceReviewForm
        onSubmit={handleSubmit}
        initialValues={{
          reviewers: pr?.reviewers ?? [],
          targetEmployee: pr?.targetEmployee as Employee,
        }}
      /> */}
    </div>
  );
}
