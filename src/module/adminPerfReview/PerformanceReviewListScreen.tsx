import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { getPerformanceReviews } from "../../repositories/perfReviewRepository";
import BaseLayout from "../../ui_components/BaseLayout";

export default function PerformanceReviewListScreen() {
  const [performanceReviews, setData] = useState<FlatPerformanceReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getPerformanceReviews();
        setData(res);
        setLoading(false);
      } catch (error) {
        setData([]);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <BaseLayout title="List of Performance Reviews">
      <div className="flex justify-end pb-6">
        <span className="sm:ml-3">
          <Link to="/performance-review/new">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create New Performance Review
            </button>
          </Link>
        </span>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Employee to be Reviewed
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Reviewer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceReviews.map((performanceReview) => (
                    <tr key={performanceReview.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {performanceReview.TargetEmployee.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {performanceReview.Reviewer.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {performanceReview.status === "completed" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/performance-review/${performanceReview.id}`}
                          className="text-indigo-600 hover:text-indigo-900 px-4"
                        >
                          View
                        </Link>
                        {performanceReview.status !== "completed" ? (
                          <Link
                            to={`/performance-review/edit/${performanceReview.id}`}
                            className="text-green-600 hover:text-green-900 px-4"
                          >
                            Edit
                          </Link>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
