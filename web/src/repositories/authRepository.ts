import { Employee } from "../models/employee";
import { LoginFormValues } from "../module/login/LoginScreen";
import * as api from "../utils/api";

export async function login(e: LoginFormValues): Promise<Employee> {
  try {
    const res = await api.post(`/auth/login`, e);
    const json = await res.json();
    if (res.status !== 200) {
      throw json;
    }
    return json;
  } catch (error) {
    throw error;
  }
}
