import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { IdParams } from "../../models/routeParams";
import { getPerformanceReview } from "../../repositories/perfReviewRepository";

export default function PerformanceReviewDetailScreen(
  props: RouteComponentProps<IdParams>
) {
  const id = +props.match.params.id;
  const [perfReview, setPerfReview] =
    useState<FlatPerformanceReview | null>(null);

  useEffect(() => {
    async function getPerformanceReviewHere() {
      const res = await getPerformanceReview(id);
      setPerfReview(res);
    }
    getPerformanceReviewHere();
  }, [id]);

  if (perfReview == null) {
    return <div>Data not available</div>;
  }
  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center px-2">
        <h3>Performance Review for "{perfReview?.TargetEmployee.name}"</h3>
        <div>
          <Link to={`/performance-review/edit/${perfReview.id}`}>
            <Button color="success">Edit Performance Review</Button>
          </Link>
        </div>
      </div>

      <Container fluid>
        <Row>
          <Col>
            <div>
              <span>Reviewer:</span>
              <span>{perfReview.Reviewer.name}</span>
              <br />
              <span>Status:</span>
              <span>{perfReview.status}</span>
              <br />
              <span>Results:</span>
              <ul>
                {perfReview.PerformanceReviewAnswers.map((e) => (
                  <li key={e.Question.id}>
                    {e.Question.text}:
                    <span className="mx-2">{e.Choice.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
