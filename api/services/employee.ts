import type { Employee } from "../../globals";
import { query } from "./db";

export async function getEmployees() {
  const rows = await query(`SELECT * FROM employee`);
  return rows ?? [];
}

export async function getEmployee(id: number) {
  const row = await query(`SELECT * FROM employee WHERE id=?`, [id]);
  return row;
}

export async function createEmployee({
  name,
  department,
  city,
  email,
}: Employee) {
  const result = await query(
    `INSERT INTO employee
    (name, department, city, email)
    VALUES
    (?, ?, ?, ?)`,
    [name, department, city, email]
  );

  let message = "Error when creating employee";

  if (result) {
    message = "Employee created successfully";
  }

  return { message };
}

export async function updateEmployee(
  id: number,
  { name, department, city, email }: Employee
) {
  const result = await query(
    `UPDATE employee
    SET name=?, department=?, city=?, email=?
    WHERE id=?`,
    [name, department, city, email, id]
  );

  let message = "Error when updating employee";

  if (result) {
    message = "Employee updated successfully";
  }

  return { message };
}

export async function deleteEmployee(id: number) {
  const result = await query(`DELETE FROM employee WHERE id=?`, [id]);

  let message = "Error in deleting employee";

  if (result) {
    message = "Employee deleted successfully";
  }

  return { message };
}
