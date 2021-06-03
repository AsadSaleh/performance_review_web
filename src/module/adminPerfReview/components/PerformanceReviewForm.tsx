import { useState } from "react";
import AsyncSelect from "react-select/async";
import { Button } from "reactstrap";
import { Employee } from "../../../models/employee";
import { getEmployees } from "../../../repositories/employeeRepository";

interface PerformanceReviewFormProps {
  initialValues?: PerformanceReviewFormValues;
  onSubmit: (e: PerformanceReviewFormValues) => void;
}

export interface PerformanceReviewFormValues {
  targetEmployee: Employee;
  reviewers: Employee[];
}

export default function PerformanceReviewForm(
  props: PerformanceReviewFormProps
) {
  const [defaultOptions, setDefaultOptions] = useState<Employee[]>([]);
  const [targetEmployee, setTargetEmployee] = useState<Employee | null>(
    props.initialValues?.targetEmployee ?? null
  );
  const [reviewers, setReviewers] = useState<Employee[]>(
    props.initialValues?.reviewers ?? []
  );

  function handleTargetEmployeeSelect(e: Employee | null) {
    setTargetEmployee(e);
  }

  function handleReviewersSelect(e: any) {
    setReviewers(e);
  }

  function handleSubmit() {
    props.onSubmit({
      reviewers: reviewers,
      targetEmployee: targetEmployee as Employee,
    });
  }

  async function handleFocus() {
    const res = await getEmployees();
    const filteredEmployees = res.filter(
      (item) => item.id !== targetEmployee?.id
    );
    setDefaultOptions(filteredEmployees);
  }

  async function getTargetEmployeeOptions(input: string) {
    const employees = await getEmployees();
    const filteredEmployees = employees.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
    return filteredEmployees;
  }

  async function getReviewerOptions(input: string) {
    const employees = await getEmployees();
    const filteredEmployees = employees
      .filter((item) => item.id !== targetEmployee?.id)
      .filter((item) =>
        input ? item.name.toLowerCase().includes(input) : true
      );
    return filteredEmployees;
  }
  return (
    <div>
      <div className="py-2">
        <div>Performance Review for:</div>
        <AsyncSelect<Employee, false>
          isClearable
          cacheOptions
          defaultOptions
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          loadOptions={getTargetEmployeeOptions}
          onChange={(value) => handleTargetEmployeeSelect(value)}
          value={targetEmployee}
        />

        <br />

        <div>Assign Co-Workers:</div>
        <AsyncSelect<Employee, true>
          isMulti
          cacheOptions
          defaultOptions={defaultOptions}
          closeMenuOnSelect={false}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          loadOptions={getReviewerOptions}
          onChange={(value) => handleReviewersSelect(value ?? [])}
          isDisabled={!targetEmployee}
          value={reviewers}
          onFocus={handleFocus}
        />

        <Button
          onClick={handleSubmit}
          color="primary"
          className="mt-3"
          disabled={targetEmployee === null || reviewers.length === 0}
        >
          {props.initialValues
            ? "Update Performance Review"
            : "Create New Performance Review"}
        </Button>
      </div>
    </div>
  );
}
