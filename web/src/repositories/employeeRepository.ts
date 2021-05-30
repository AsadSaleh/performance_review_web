import { EditEmployee, Employee } from "../models/employee";

export async function getEmployees(): Promise<Employee[]> {
  console.log("Calling getEmployees");
  try {
    const res = await fetch("http://localhost:3000/employee");
    const json = await res.json();
    console.log({ res });
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
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
    console.log("createEmployee", e);
    const res = await fetch(`http://localhost:3000/employee`, {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ res });
    const json = await res.json();
    console.log({ json });
    return e;
  } catch {
    console.log("error");
    return null;
  }
}

export async function updateEmployee(
  id: Employee["id"],
  e: EditEmployee
): Promise<Employee | null> {
  try {
    console.log("updateEmployee", id, e);
    const res = await fetch(`http://localhost:3000/employee/${id}`, {
      method: "PUT",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log({ json });
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
    const json = await res.json();
    console.log({ json });
    return true;
  } catch {
    return false;
  }
}
