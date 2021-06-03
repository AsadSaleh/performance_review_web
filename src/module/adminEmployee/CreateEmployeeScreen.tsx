import React from "react";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { createEmployee } from "../../repositories/employeeRepository";
import BaseLayout from "../../ui_components/BaseLayout";
import EmployeeForm, { EmployeeFormValues } from "./components/EmployeeForm";

export default function CreateEmployeeScreen(props: RouteComponentProps) {
  async function handleCreateEmployee(v: EmployeeFormValues) {
    try {
      await createEmployee({
        name: v.name,
        department: v.department,
        city: v.city,
        email: v.email,
        role: v.role ? "admin" : "employee",
      });
      props.history.push("/employee");
      toast(
        <div>
          <div>Success!</div>
          <div className="text-sm">Created new user: {v.name}</div>
        </div>,
        { type: "success" }
      );
    } catch (error) {
      toast(
        <div>
          <div>Error!</div>
          <div className="text-sm">Failed to create user</div>
        </div>,
        { type: "error" }
      );
    }
  }

  return (
    <BaseLayout title="Create New Employee">
      <EmployeeForm onSubmit={handleCreateEmployee} />
    </BaseLayout>
  );
}
