import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { PerformanceReview } from "../../models/performanceReview";
import { getPerformanceReviews } from "../../repositories/perfReviewRepository";

export default function EmployeePerformanceReviewList() {
  const [prs, setPrs] = useState<PerformanceReview[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReviews();
        setPrs(res);
      } catch (error) {}
    }
    getData();
  }, []);

  return (
    <div className="py-2">
      <div className="d-flex justify-content-end px-2"></div>
      <Table>
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
              <td>{pr.targetEmployee.name}</td>
              <td>{pr.status}</td>
              <td>
                <Link to={`/pending-performance-review/${pr.id}`}>
                  <Button color="primary" size="sm" outline>
                    Fill out the form
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
