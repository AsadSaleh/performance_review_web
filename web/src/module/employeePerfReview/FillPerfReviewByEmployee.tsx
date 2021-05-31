import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button, Container } from "reactstrap";
import { Employee } from "../../models/employee";
import { PerformanceReview } from "../../models/performanceReview";
import {
  getPerformanceReview,
  submitPerformanceReview,
} from "../../repositories/perfReviewRepository";

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

export default function FillPerfReviewByEmployee(props: RouteComponentProps) {
  const currentUser: Employee = {
    id: 879423,
    name: "Hasan",
  };
  const id = 478129;
  const [pr, setPr] = useState<PerformanceReview | null>(null);

  const [v1, hc1] = useRadioState<LabelValue>();
  const [v2, hc2] = useRadioState<LabelValue>();
  const [v3, hc3] = useRadioState<LabelValue>();
  const [v4, hc4] = useRadioState<LabelValue>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReview(id);
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
    console.log({ v1, v2, v3, v4 });
    submitPerformanceReview(id, currentUser.id, {
      1: v1,
      2: v2,
      3: v3,
      4: v4,
    });
    props.history.push("/pending-performance-review");
  }

  return (
    <Container fluid>
      <h3>Employee Peer Review</h3>
      <div>
        <h6>Performance Review for: "{pr.targetEmployee.name}"</h6>
        <h6>By: "{currentUser.name}"</h6>
        <form onSubmit={handleSubmit}>
          {/* 1 */}
          <div className="mb-4">
            <legend>1. Work Skills</legend>
            {radios.map((v) => {
              const id = `workSkills_${v.value}`;
              return (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="workSkills"
                    onChange={() => hc1(v)}
                    required
                  />
                  <label htmlFor={id} className="mx-2">
                    {v.label}
                  </label>
                </div>
              );
            })}
          </div>

          {/* 2 */}
          <div className="mb-4">
            <legend>2. Team Work</legend>
            {radios.map((v) => {
              const id = `teamWork_${v.value}`;
              return (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="teamWork"
                    onChange={() => hc2(v)}
                    required
                  />
                  <label htmlFor={id} className="mx-2">
                    {v.label}
                  </label>
                </div>
              );
            })}
          </div>

          {/* 3 */}
          <div className="mb-4">
            <legend>3. Communication</legend>
            {radios.map((v) => {
              const id = `communication_${v.value}`;
              return (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="communication"
                    onChange={() => hc3(v)}
                    required
                  />
                  <label htmlFor={id} className="mx-2">
                    {v.label}
                  </label>
                </div>
              );
            })}
          </div>
          {/* 4 */}
          <div className="mb-4">
            <legend>4. Time Management</legend>
            {radios.map((v) => {
              const id = `timeManagement_${v.value}`;
              return (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="timeManagement"
                    onChange={() => hc4(v)}
                    required
                  />
                  <label htmlFor={id} className="mx-2">
                    {v.label}
                  </label>
                </div>
              );
            })}
          </div>

          <Button type="submit" color="primary" className="my-2">
            Submit Peer Review
          </Button>
        </form>
      </div>
    </Container>
  );
}

function useRadioState<T>(): [T | null, (v: T) => void] {
  const [value, setValue] = useState<T | null>(null);

  function handleChange(v: T): void {
    setValue(v);
  }

  return [value, handleChange];
}
