import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  PerformanceReview,
  PerformanceReviewStatus,
} from "../../models/performanceReview";
import {
  deletePerformanceReview,
  getPerformanceReviews,
} from "../../repositories/perfReviewRepository";

export default function PerformanceReviewListScreen(
  props: RouteComponentProps
) {
  // const [state, setState] = useState<UiState>("loading");
  const [data, setData] = useState<PerformanceReview[]>([]);

  async function getData() {
    try {
      const res = await getPerformanceReviews();
      setData(res);
    } catch (error) {}
  }

  function handleDelete(e: PerformanceReview) {
    const confirmation = window.confirm(
      `Are you sure you want to delete Performance Review\nfor ${e.target.name}?`
    );
    if (confirmation) {
      deleteEmployee(e);
    }
  }

  function handleEdit(e: PerformanceReview) {
    props.history.push(`/performance-review/${e.id}`);
  }

  async function deleteEmployee(e: PerformanceReview) {
    try {
      await deletePerformanceReview(e);
    } catch (error) {}
  }

  function handleCreateNewPR() {
    props.history.push("/performance-review/new");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={handleCreateNewPR}>Create New Employee</button>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>PR Target</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.target.name}</td>
              <td>
                <Link to="/performance-review/7/13">
                  <button>Go to Detail</button>
                </Link>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
