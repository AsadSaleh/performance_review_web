import { EditEmployee, Employee } from "../models/employee";
import * as api from "../utils/api";

export async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await api.get(`/employee`);
    const json = await res.json();
    return json;
  } catch (error) {
    return [];
  }
}

export async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const res = await api.get(`/employee/${id}`);
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
    const res = await api.post(`/employee`, e);
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
    const res = await api.put(`/employee/${id}`, e);
    await res.json();
    return { ...e, id };
  } catch {
    return null;
  }
}

export async function deleteEmployee(e: Employee): Promise<boolean> {
  try {
    const res = await api.deleteAsync(`/employee/${e.id}`);
    await res.json();
    return true;
  } catch {
    return false;
  }
}
