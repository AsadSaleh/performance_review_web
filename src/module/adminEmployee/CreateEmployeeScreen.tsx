import { createEmployee } from "../../repositories/employeeRepository";

export default function CreateEmployeeScreen() {
  async function handleSumbit(e: any) {
    e.preventDefault();
    await createEmployee({
      name: e.target.name as string,
      id: 48723,
      department: e.target.name,
      address: { city: e.target.city },
    });
  }
  return (
    <div>
      <h1>Create New Employee</h1>
      <form onSubmit={handleSumbit}>
        <input placeholder="Full Name" name="name" />
        <br />
        <input placeholder="Department" name="department" />
        <br />
        <input placeholder="City" name="city" />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
