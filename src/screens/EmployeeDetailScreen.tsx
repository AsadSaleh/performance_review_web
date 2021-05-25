import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Employee } from "../models/employee";
import { getEmployee } from "../repositories/employeeRepository";

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default function EmployeeDetailScreen(props: Props) {
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
    <div>
      <h1>Detail</h1>

      <h4>ID</h4>
      <h5>{employee.id}</h5>
      <h4>Fullname</h4>
      <h5>{employee.name}</h5>
      <h4>Phone Number</h4>
      <h5>{employee.phone}</h5>
      <h4>Email</h4>
      <h5>{employee.email}</h5>
      <h4>Department</h4>
      <h5>{employee.department}</h5>
      <h4>Address</h4>
      <h5>{employee.address?.city}</h5>
    </div>
  );
}
