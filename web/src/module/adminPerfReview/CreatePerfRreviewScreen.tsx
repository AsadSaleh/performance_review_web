import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import AsyncSelect from "react-select/async";
import { Employee } from "../../models/employee";
import { EmployeeIdParams, IdParams } from "../../models/routeParams";
import {
  getEmployee,
  getEmployees,
} from "../../repositories/employeeRepository";

export default function CreatePerfReviewScreen(
  props: RouteComponentProps<EmployeeIdParams>
) {
  const employeeId = props.match.params.employeeId;
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function getEmployeeDisini() {
      const employee = await getEmployee(employeeId);
      setEmployee(employee);
    }
    getEmployeeDisini();
  }, []);

  if (employee == null) {
    return <div> data kosong </div>;
  }

  async function getOptions(inputValue: string, callback: any) {
    console.log("gue dipanggil");
    // if (!inputValue) {
    //   return callback([]);
    // }
    // Filter out current empployee
    const employees = await getEmployees();
    const filteredEmployees = employees.filter(
      (item) => item.id != employee?.id
    );
    return callback(filteredEmployees);
  }

  return (
    <div className="py-2">
      <h3>Performance Review for {employee.name}</h3>

      <p>Assign Co-Worker:</p>

      <AsyncSelect<Employee, true>
        isMulti
        cacheOptions
        defaultOptions
        closeMenuOnSelect={false}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        loadOptions={getOptions}
      />
    </div>
  );
}
