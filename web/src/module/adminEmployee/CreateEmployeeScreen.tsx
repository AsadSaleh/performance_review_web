import React from "react";
import { RouteComponentProps } from "react-router";
import { createEmployee } from "../../repositories/employeeRepository";
import EmployeeForm from "./components/EmployeeForm";

type FormValue = {
  name: string;
  department: string;
  city: string;
};

export default function CreateEmployeeScreen(props: RouteComponentProps) {
  async function handleCreateEmployee(v: FormValue) {
    console.log(v);
    await createEmployee({
      id: Math.random().toString().replaceAll(".", ""),
      name: v.name,
      department: v.department,
      city: v.city,
    });
    props.history.push("/employee");
  }
  return (
    <div className="p-5">
      <h3>Create New Employee</h3>
      <EmployeeForm onSubmit={handleCreateEmployee} />;
    </div>
  );
}
