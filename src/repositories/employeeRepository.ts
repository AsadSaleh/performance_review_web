import { Employee } from "../models/employee";



export async function getEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}
