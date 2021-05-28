import { Employee } from "../models/employee";

export async function getEmployees(): Promise<Employee[]> {
  try {
    const str = window.localStorage.getItem("Employee");
    if (str == null) return [];
    const data = JSON.parse(str) as Employee[];
    
    return data;
  } catch (error) {
    return [];
  }
}

export async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function createEmployee(e: Employee): Promise<Employee | null> {
  try {
    const str = window.localStorage.getItem("Employee");
    if (str == null) return null;
    const employees = JSON.parse(str) as Employee[];
    window.localStorage.setItem("Employee", JSON.stringify(employees.concat(e)));
    return e;
  } catch {
    return null;
  }
}

export async function updateEmployee(e: Employee): Promise<Employee | null> {
  try {
    const response = await fetch("");
    const data: Employee = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function deleteEmployee(e: Employee): Promise<true | null> {
  try {
    await fetch("");
    return true;
  } catch {
    return null;
  }
}
