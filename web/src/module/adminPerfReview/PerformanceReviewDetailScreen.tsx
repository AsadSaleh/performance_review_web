import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { PerformanceReview } from "../../models/performanceReview";
import { IdParams } from "../../models/routeParams";
import { getPerformanceReview } from "../../repositories/perfReviewRepository";

export default function PerformanceReviewDetailScreen(
  props: RouteComponentProps<IdParams>
) {
  const id = +props.match.params.id;
  const [perfReview, setPerfReview] = useState<PerformanceReview | null>(null);

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
        <h3>Performance Review for "{perfReview?.targetEmployee.name}"</h3>
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
              Reviewers:
              <ul>
                {perfReview?.reviewers.map((reviewer) => (
                  <li key={reviewer.id}>{reviewer.name}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
