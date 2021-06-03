import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { getPerformanceReviews } from "../../repositories/perfReviewRepository";

export default function PerformanceReviewListScreen(
  props: RouteComponentProps
) {
  const [data, setData] = useState<FlatPerformanceReview[]>([]);

  function handleEdit(e: FlatPerformanceReview) {
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
        <button onClick={handleCreateNewPR}>
          Create New Performance Review
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Target Employee</td>
            <td>Reviewer</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.TargetEmployee.name}</td>
              <td>{item.Reviewer.name}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/performance-review/${item.id}`}>
                  <button>Go to Detail</button>
                </Link>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
