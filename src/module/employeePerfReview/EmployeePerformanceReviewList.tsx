import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { getEmployeePerformanceReviews } from "../../repositories/perfReviewRepository";
import { useAuth } from "../../store/auth";

export default function EmployeePerformanceReviewList() {
  const {
    state: { user },
  } = useAuth();
  const [prs, setPrs] = useState<FlatPerformanceReview[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getEmployeePerformanceReviews(user?.id!);
        setPrs(res);
      } catch (error) {}
    }
    getData();
  }, [user?.id]);

  return (
    <div className="py-2">
      <div className="d-flex justify-content-end px-2"></div>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>PR Target</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {prs.map((pr) => (
            <tr key={pr.id}>
              <td>{pr.id}</td>
              <td>{pr.TargetEmployee.name}</td>
              <td>{pr.status}</td>
              <td>
                <Link to={`/pending-performance-review/${pr.id}`}>
                  <button>Fill out the form</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
