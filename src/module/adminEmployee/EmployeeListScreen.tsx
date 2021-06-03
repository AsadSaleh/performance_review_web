import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../../models/employee";
import {
  deleteEmployee,
  getEmployees,
} from "../../repositories/employeeRepository";
import BaseLayout from "../../ui_components/BaseLayout";

export default function EmployeeListScreen() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getData() {
    try {
      const data = await getEmployees();
      setData(data);
      setLoading(false);
    } catch (error) {
      setData([]);
    }
  }

  async function handleDelete(e: Employee) {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${e.name}?`
    );
    if (!confirmation) return;
    try {
      await deleteEmployee(e);
      getData();
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <BaseLayout title="List of Employees">
      <div className="flex justify-end pb-6">
        <Link to="/employee/new">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Employee
          </button>
        </Link>
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {person.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {person.role === "admin" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                            Employee
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/employee/${person.id}`}
                          className="text-indigo-600 hover:text-indigo-900 px-4"
                        >
                          View
                        </Link>
                        <Link
                          to={`/employee/${person.id}/edit`}
                          className="text-green-600 hover:text-green-900 px-4"
                        >
                          Edit
                        </Link>
                        {person.role !== "admin" ? (
                          <button
                            onClick={() => handleDelete(person)}
                            className="text-red-600 hover:text-red-900 px-4"
                          >
                            Delete
                          </button>
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
