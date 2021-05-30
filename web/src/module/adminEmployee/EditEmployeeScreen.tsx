import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Employee } from "../../models/employee";
import { EmployeeIdParams } from "../../models/routeParams";
import {
  getEmployee,
  updateEmployee,
} from "../../repositories/employeeRepository";
import EmployeeForm, { EmployeeFormValues } from "./components/EmployeeForm";

export default function EditEmployeeScreen(
  props: RouteComponentProps<EmployeeIdParams>
) {
  const employeeId = props.match.params.employeeId;
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function getEmployeeDisini() {
      const empl = await getEmployee(employeeId);
      setEmployee(empl);
    }
    getEmployeeDisini();
  }, [employeeId]);

  async function handleEditEmployee(v: EmployeeFormValues) {
    await updateEmployee(+employeeId, {
      name: v.name,
      department: v.department,
      city: v.city,
      email: v.email,
    });
    props.history.push(`/employee/${employeeId}`);
  }

  if (employee == null) {
    return <div>No Data</div>;
  }

  return (
    <div className="p-5">
      <h3>Edit Employee</h3>
      <EmployeeForm
        onSubmit={handleEditEmployee}
        initialValues={{
          name: employee.name,
          city: employee.city,
          department: employee.department,
          email: employee.email,
        }}
      />
    </div>
  );
}
