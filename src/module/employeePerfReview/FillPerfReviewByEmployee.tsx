import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { FlatPerformanceReview } from "../../models/performanceReview";
import {
  getPerformanceReview,
  submitPerformanceReview,
} from "../../repositories/perfReviewRepository";
import BaseLayout from "../../ui_components/BaseLayout";

type LabelValue = {
  label: string;
  value: number;
};

const radios: LabelValue[] = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Bad" },
  { value: 3, label: "Okay" },
  { value: 4, label: "Good" },
  { value: 5, label: "Excellent!" },
];

export default function FillPerfReviewByEmployee(
  props: RouteComponentProps<{ performanceReviewId: string }>
) {
  const id = props.match.params.performanceReviewId;
  const [pr, setPr] = useState<FlatPerformanceReview | null>(null);

  const [v1, hc1] = useRadioState<LabelValue>();
  const [v2, hc2] = useRadioState<LabelValue>();
  const [v3, hc3] = useRadioState<LabelValue>();
  const [v4, hc4] = useRadioState<LabelValue>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReview(+id);
        setPr(res);
      } catch (error) {}
    }
    getData();
  }, [id]);

  if (pr === null) {
    return <div>Data not available</div>;
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      submitPerformanceReview([
        { QuestionId: 1, ChoiceId: v1?.value!, PerformanceReviewId: +id },
        { QuestionId: 2, ChoiceId: v2?.value!, PerformanceReviewId: +id },
        { QuestionId: 3, ChoiceId: v3?.value!, PerformanceReviewId: +id },
        { QuestionId: 4, ChoiceId: v4?.value!, PerformanceReviewId: +id },
      ]);
      props.history.push("/pending-performance-review");
      toast(
        <div>
          <div>Success!</div>
          <div className="text-sm">
            Performance review for {pr?.TargetEmployee.name} successfully
            submitted
          </div>
        </div>,
        { type: "success" }
      );
    } catch (error) {
      toast(
        <div>
          <div>Error!</div>
          <div className="text-sm">Failed to submit performance review</div>
        </div>,
        { type: "error" }
      );
    }
  }

  return (
    <BaseLayout>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex justify-between items-center">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Fill Out Performance Review
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please fill the form accordingly for employee&nbsp;
                <span className="font-bold">{pr.TargetEmployee.name}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5">
            {/* 1 */}
            <div className="col-span-6 sm:col-span-3 mb-4">
              <legend>1. Work Skills</legend>
              {radios.map((v) => {
                const id = `workSkills_${v.value}`;
                return (
                  <div key={id} className="ml-4">
                    <input
                      type="radio"
                      id={id}
                      name="workSkills"
                      onChange={() => hc1(v)}
                      required
                    />
                    <label htmlFor={id} className="mx-2 text-gray-600">
                      {v.label}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* 2 */}
            <div className="col-span-6 sm:col-span-3 mb-4">
              <legend>2. Team Work</legend>
              {radios.map((v) => {
                const id = `teamWork_${v.value}`;
                return (
                  <div key={id} className="ml-4">
                    <input
                      type="radio"
                      id={id}
                      name="teamWork"
                      onChange={() => hc2(v)}
                      required
                    />
                    <label htmlFor={id} className="mx-2 text-gray-600">
                      {v.label}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* 3 */}
            <div className="col-span-6 sm:col-span-3 mb-4">
              <legend>3. Communication</legend>
              {radios.map((v) => {
                const id = `communication_${v.value}`;
                return (
                  <div key={id} className="ml-4">
                    <input
                      type="radio"
                      id={id}
                      name="communication"
                      onChange={() => hc3(v)}
                      required
                    />
                    <label htmlFor={id} className="mx-2 text-gray-600">
                      {v.label}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* 4 */}
            <div className="col-span-6 sm:col-span-3 mb-4">
              <legend>4. Time Management</legend>
              {radios.map((v) => {
                const id = `timeManagement_${v.value}`;
                return (
                  <div key={id} className="ml-4">
                    <input
                      type="radio"
                      id={id}
                      name="timeManagement"
                      onChange={() => hc4(v)}
                      required
                    />
                    <label htmlFor={id} className="mx-2 text-gray-600">
                      {v.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-2 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Peer Review
            </button>
          </div>
        </div>
      </form>
    </BaseLayout>
  );
}

function useRadioState<T>(): [T | null, (v: T) => void] {
  const [value, setValue] = useState<T | null>(null);

  function handleChange(v: T): void {
    setValue(v);
  }

  return [value, handleChange];
}
