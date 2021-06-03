import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Employee } from "../../models/employee";
import {
  deleteEmployee,
  getEmployees,
} from "../../repositories/employeeRepository";

export default function EmployeeListScreen(props: RouteComponentProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Employee[]>([]);

  async function getDataFromServer() {
    const data = await getEmployees();
    setData(data ?? []);
    setLoading(false);

    console.log("data bentuknya apa sih?");
    console.table(data);
  }

  function handleCreateNewEmployee() {
    props.history.push("/employee/new");
  }

  function handleDelete(e: Employee) {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${e.name}?`
    );
    if (confirmation) {
      deleteEmployee(e);
    }
    getDataFromServer();
  }

  function handleEdit(e: Employee) {
    props.history.push(`/employee/${e.id}/edit`);
  }

  useEffect(() => {
    getDataFromServer();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="d-flex justify-content-end px-2">
        <button onClick={handleCreateNewEmployee}>Create New Employee</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Fullname</td>
            <td>Role</td>
            <td>City</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.city}</td>
              <td>
                <Link to={`/employee/${item.id}`}>
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
