import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { PerformanceReview } from "../../models/performanceReview";
import { getPerformanceReviews } from "../../repositories/perfReviewRepository";

export default function PerformanceReviewListScreen(
  props: RouteComponentProps
) {
  const [data, setData] = useState<PerformanceReview[]>([]);

  function handleEdit(e: PerformanceReview) {
    console.log({ e });
    props.history.push(`/performance-review/edit/${e.id}`);
  }

  function handleCreateNewPR() {
    console.log("handleCreateNewPr");
    props.history.push("/performance-review/new");
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReviews();
        setData(res);
      } catch (error) {}
    }
    getData();
  }, []);

  return (
    <div className="py-2">
      <div className="d-flex justify-content-end px-2">
        <Button color="primary" onClick={handleCreateNewPR}>
          Create New Performance Review
        </Button>
      </div>
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.targetEmployee.name}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/performance-review/${item.id}`}>
                  <Button color="primary" size="sm" outline>
                    Go to Detail
                  </Button>
                </Link>
                <Button
                  color="success"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  outline
                  className="mx-2"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
