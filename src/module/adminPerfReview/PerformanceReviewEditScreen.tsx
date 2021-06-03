import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { Employee } from "../../models/employee";
import { FlatPerformanceReview } from "../../models/performanceReview";
import {
  getPerformanceReview,
  getPerformanceReviewsByTargetEmployee,
  updatePerformanceReview,
} from "../../repositories/perfReviewRepository";
import BaseLayout from "../../ui_components/BaseLayout";
import PerformanceReviewEditForm, {
  PerformanceReviewEditFormValues,
} from "./components/PerformanceReviewEditForm";

export default function PerformanceReviewEditScreen(
  props: RouteComponentProps<{ id: string }>
) {
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;
  const [pr, setPr] = useState<FlatPerformanceReview | null>(null);
  const [reviewers, setReviewers] = useState<Employee[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReview(+id);
        setPr(res);
        const res2 = await getPerformanceReviewsByTargetEmployee(
          res?.TargetEmployee.id!
        );
        setReviewers(res2.map((e) => e.Reviewer));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(pr: PerformanceReviewEditFormValues) {
    try {
      await updatePerformanceReview(+id, {
        ReviewerId: pr.reviewer.id,
      });
      toast(
        <div>
          <div>Success!</div>
          <div className="text-sm">
            Updated performance review. Reviwer set to {pr.reviewer.name}
          </div>
        </div>,
        { type: "success" }
      );
      props.history.push("/performance-review");
    } catch (error) {
      toast(
        <div>
          <div>Error!</div>
          <div className="text-sm">Failed to update performance review</div>
        </div>,
        { type: "error" }
      );
    }
  }

  if (pr === null) {
    return <div>Data not available</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const disabledReviewers = reviewers.filter((r) => r.id !== pr.Reviewer.id);
  // console.log({ reviewers });
  // console.log({ reviwer: pr.Reviewer });
  // console.log({ disabledReviewers });

  return (
    <BaseLayout>
      <PerformanceReviewEditForm
        onSubmit={handleSubmit}
        initialValues={{
          reviewer: pr.Reviewer,
          disabledReviewers: disabledReviewers,
          targetEmployee: pr?.TargetEmployee,
        }}
      />
    </BaseLayout>
  );
}
