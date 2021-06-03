import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Employee } from "../../models/employee";
import { IdParams } from "../../models/routeParams";
import { getEmployee } from "../../repositories/employeeRepository";

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

  if (employee == null) {
    return <div> data kosong </div>;
  }

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center px-2">
        <h3>{employee.name}</h3>
        <div>
          <Link to={`/employee/${id}/edit`} className="mx-2">
            <button>Edit Employee</button>
          </Link>
          <Link to={`/performance-review/new/${id}`}>
            <button>Create Performance Review</button>
          </Link>
        </div>
      </div>

      <div>
        <div>
          <div>ID</div>
          <div>{employee.id}</div>
        </div>
        <div>
          <div>Email</div>
          <div>{employee.email}</div>
        </div>
        <div>
          <div>Department</div>
          <div>{employee.department}</div>
        </div>
        <div>
          <div>City</div>
          <div>{employee.city}</div>
        </div>
      </div>
    </div>
  );
}
