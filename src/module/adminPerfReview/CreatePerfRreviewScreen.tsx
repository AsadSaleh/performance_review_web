import { useState } from "react";
import { Employee } from "../../models/employee";
import { getEmployees } from "../../repositories/employeeRepository";

export default function CreatePerfReviewScreen() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 89723,
      name: "klafjds",
    },
  ]);

  function handleRemoveEmployee(e: Employee) {
    setEmployees((prev) => prev.filter((item) => item.id != e.id));
  }

  return (
    <div>
      <h1>Create PR Screen</h1>

      <p>Assign Co-Worker:</p>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <span>{employee.name}</span>
            <span>
              <button onClick={() => handleRemoveEmployee(employee)}>X</button>
            </span>
          </li>
        ))}
      </ul>
      <MiniForm />
    </div>
  );
}

function MiniForm() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  function handleSubmit() {}
  async function handleChange(e: any) {
    console.log(e.target.value);
    const search: string = e.target.value;
    const res = await getEmployees();
    return res.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <form>
      <input placeholder="Nama Karyawan" onChange={handleChange} />
      <button type="submit">Add Co-Worker</button>
    </form>
  );
}
