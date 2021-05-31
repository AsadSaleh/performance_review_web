import { EditEmployee, Employee } from "../models/employee";

export async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await fetch("http://localhost:3000/employee");
    const json = await res.json();
    return json;
  } catch (error) {
    return [];
  }
}

export async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const res = await fetch(`http://localhost:3000/employee/${id}`);
    const json = (await res.json()) as Employee[];
    return json[0];
  } catch (error) {
    return null;
  }
}

export async function createEmployee(
  e: EditEmployee
): Promise<EditEmployee | null> {
  try {
    const res = await fetch(`http://localhost:3000/employee`, {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    return e;
  } catch {
    return null;
  }
}

export async function updateEmployee(
  id: Employee["id"],
  e: EditEmployee
): Promise<Employee | null> {
  try {
    const res = await fetch(`http://localhost:3000/employee/${id}`, {
      method: "PUT",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    return { ...e, id };
  } catch {
    return null;
  }
}

export async function deleteEmployee(e: Employee): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:3000/employee/${e.id}`, {
      method: "DELETE",
    });
    await res.json();
    return true;
  } catch {
    return false;
  }
}
