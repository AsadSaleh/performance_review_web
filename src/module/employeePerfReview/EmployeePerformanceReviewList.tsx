import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { getEmployeePerformanceReviews } from "../../repositories/perfReviewRepository";
import { useAuth } from "../../store/auth";
import BaseLayout from "../../ui_components/BaseLayout";

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
    <BaseLayout title="Pending Performance Reviews">
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
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prs.map((pr) => (
                    <tr key={pr.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {pr.TargetEmployee.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {pr.status === "completed" ? (
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
                          to={`/pending-performance-review/${pr.id}`}
                          className="text-indigo-600 hover:text-indigo-900 px-4"
                        >
                          Fill Out the Form
                        </Link>
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
