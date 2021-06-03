import React from "react";
import { RouteComponentProps } from "react-router";
import { createEmployee } from "../../repositories/employeeRepository";
import EmployeeForm, { EmployeeFormValues } from "./components/EmployeeForm";

export default function CreateEmployeeScreen(props: RouteComponentProps) {
  async function handleCreateEmployee(v: EmployeeFormValues) {
    try {
      await createEmployee({
        name: v.name,
        department: v.department,
        city: v.city,
        email: v.email,
      });
      props.history.push("/employee");
    } catch (error) {}
  }

  return (
    <div className="p-5">
      <h3>Create New Employee</h3>
      <EmployeeForm onSubmit={handleCreateEmployee} />
    </div>
  );
}
