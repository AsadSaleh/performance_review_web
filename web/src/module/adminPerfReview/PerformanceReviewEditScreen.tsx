import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "reactstrap";
import { Employee } from "../../models/employee";
import { PerformanceReview } from "../../models/performanceReview";
import {
  getPerformanceReview,
  updatePerformanceReview,
} from "../../repositories/perfReviewRepository";
import PerformanceReviewForm, {
  PerformanceReviewFormValues,
} from "./components/PerformanceReviewForm";

export default function PerformanceReviewEditScreen(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  const [pr, setPr] = useState<PerformanceReview | null>(null);

  useEffect(() => {
    async function getData() {
      const res = await getPerformanceReview(+id);
      setPr(res);
    }
    getData();
  }, [id]);

  function handleSubmit(pr: PerformanceReviewFormValues) {
    updatePerformanceReview(+id, {
      target_employee_id: pr.targetEmployee.id,
      reviewers_id: pr.reviewers.map((e) => e.id),
    });
  }

  if (pr === null) {
    return <div>Data not available</div>;
  }

  return (
    <Container fluid className="mt-2">
      <h3>Edit Performance Review</h3>
      <PerformanceReviewForm
        onSubmit={handleSubmit}
        initialValues={{
          reviewers: pr?.reviewers ?? [],
          targetEmployee: pr?.targetEmployee as Employee,
        }}
      />
    </Container>
  );
}
