import { PencilIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Employee } from "../../models/employee";
import { IdParams } from "../../models/routeParams";
import { getEmployee } from "../../repositories/employeeRepository";
import BaseLayout from "../../ui_components/BaseLayout";

export default function EmployeeDetailScreen(
  props: RouteComponentProps<IdParams>
) {
  const id = props.match.params.id;
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function getEmployeeDisini() {
      const empl = await getEmployee(id);
      setEmployee(empl);
    }
    getEmployeeDisini();
  }, [id]);

  if (employee === null) {
    return <div> data kosong </div>;
  }

  return (
    <BaseLayout title={employee.name}>
      <div className="mt-10 sm:mt-0">
        <div className="d-flex justify-content-between align-items-center px-2">
          <div className="py-8 px-8 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img
              className="block mx-auto h-24 w-24 rounded-full sm:mx-0 sm:flex-shrink-0"
              src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="Woman's Face"
            />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  {employee.name}
                </p>
                <p className="text-gray-500 font-medium text-xs">
                  ID: {employee.id}
                </p>
                <p className="text-gray-500 font-medium">
                  {employee.department} | {employee.city}
                </p>
              </div>
            </div>
            <Link to={`/employee/${id}/edit`} className="mx-2">
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
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
