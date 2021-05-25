import { Link } from "react-router-dom";

export default function PerformanceReviewListScreen() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>PR Target</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>Ali Martondi</td>
            <td>
              <Link to="/performance-review/7/13">
                <button>Go to Detail</button>
              </Link>
              <button />
              <button />
            </td>
          </tr>
          <tr>
            <td>100</td>
            <td>Ali Martondi</td>
            <td>
              <Link to="/performance-review/7/12">
                <button>Go to Detail</button>
              </Link>
              <button />
              <button />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
