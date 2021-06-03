import { PencilIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { FlatPerformanceReview } from "../../models/performanceReview";
import { IdParams } from "../../models/routeParams";
import { getPerformanceReview } from "../../repositories/perfReviewRepository";
import BaseLayout from "../../ui_components/BaseLayout";
import Pill from "../../ui_components/Pill";

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

  function getClassNameByValue(value: number) {
    if (value === 5) return "bg-blue-500 text-white";
    if (value === 4) return "bg-green-300 text-green-800";
    if (value === 3) return "bg-green-100 text-green-800";
    if (value === 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="flex justify-between items-center">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Performance Review
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detail, Status, and Result for current performance review.
            </p>
          </div>

          {perfReview.status !== "completed" && (
            <Link
              to={`/performance-review/edit/${id}`}
              className="px-4 py-5 sm:px-6"
            >
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edit
                </button>
              </span>
            </Link>
          )}
        </div>

        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Employee Full Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {perfReview.TargetEmployee.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Reviewer Full Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {perfReview.Reviewer.name}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span>
                  {perfReview.status === "completed" ? (
                    <Pill>Completed</Pill>
                  ) : (
                    <Pill className="bg-yellow-100 text-yellow-800">
                      Pending
                    </Pill>
                  )}
                </span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Results</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {perfReview.PerformanceReviewAnswers.length ? (
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {perfReview.PerformanceReviewAnswers.map((e) => (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">
                            {e.Question.text}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Pill className={getClassNameByValue(e.Choice.value)}>
                            {e.Choice.text}
                          </Pill>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </BaseLayout>
  );
}
