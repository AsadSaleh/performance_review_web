import { Employee } from "../models/employee";

export async function getEmployees(): Promise<Employee[]> {
  console.log('Calling getEmployees')
  try {
    const str = window.localStorage.getItem("Employee");
    if (str == null) {
      window.localStorage.setItem("Employee", JSON.stringify([]));
      return []
    };
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
    console.log({ str });
    if (str == null) {
      window.localStorage.setItem("Employee", JSON.stringify([e]));
      return e;
    };
    const employees = JSON.parse(str) as Employee[];
    console.log({ employees });
    const newEmployees = employees.concat(e)
    console.log({newEmployees});
    window.localStorage.setItem("Employee", JSON.stringify(newEmployees));
    return e;
  } catch {
    return null;
  }
}

export async function updateEmployee(id: Employee["id"], e: Employee): Promise<Employee | null> {
  try {
    const response = await fetch("");
    const data: Employee = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function deleteEmployee(e: Employee): Promise<boolean> {
  try {
    const str = window.localStorage.getItem("Employee");
    if (str == null) {
      window.localStorage.setItem("Employee", JSON.stringify([]));
      return true;
    };
    const data = JSON.parse(str) as Employee[];
    console.log({data});
    const newData = data.filter(item => item.id != e.id);
    console.log({newData});
    window.localStorage.setItem("Employee", JSON.stringify(newData));
    return true;
  } catch {
    return false;
  }
}
