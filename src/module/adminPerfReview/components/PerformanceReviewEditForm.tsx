import { useState } from "react";
import AsyncSelect from "react-select/async";
import { Employee } from "../../../models/employee";
import { getEmployees } from "../../../repositories/employeeRepository";

interface PerformanceReviewEditFormProps {
  initialValues?: PerformanceReviewInitialValues;
  onSubmit: (e: PerformanceReviewEditFormValues) => void;
}

export interface PerformanceReviewInitialValues {
  disabledReviewers: Employee[];
  targetEmployee: Employee;
  reviewer: Employee;
}

export interface PerformanceReviewEditFormValues {
  reviewer: Employee;
}

export default function PerformanceReviewEditForm(
  props: PerformanceReviewEditFormProps
) {
  const [defaultOptions, setDefaultOptions] = useState<Employee[]>([]);
  const [targetEmployee, setTargetEmployee] = useState<Employee | null>(
    props.initialValues?.targetEmployee ?? null
  );
  const [selectedReviewer, setSelectedReviewer] = useState(
    props.initialValues?.reviewer
  );

  function handleTargetEmployeeSelect(e: Employee | null) {
    setTargetEmployee(e);
  }

  function handleReviewersSelect(e: any) {
    setSelectedReviewer(e);
  }

  function handleSubmit() {
    props.onSubmit({
      reviewer: selectedReviewer!,
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
    <div className="mt-10 sm:mt-0">
      <div className="md:grid ">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow sm:rounded-md">
            <div className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md px-4 py-5 bg-white sm:p-6">
              <div className="mt-1 text-gray-600">Performance Review for:</div>
              <AsyncSelect<Employee, false>
                isClearable
                cacheOptions
                defaultOptions
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                loadOptions={getTargetEmployeeOptions}
                onChange={(value) => handleTargetEmployeeSelect(value)}
                value={targetEmployee}
                isDisabled
              />

              <br />

              <div className="mt-1 text-gray-600">Assign Reviewer:</div>
              <AsyncSelect<Employee, false>
                cacheOptions
                defaultOptions={defaultOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                loadOptions={getReviewerOptions}
                onChange={(value) => handleReviewersSelect(value ?? [])}
                isDisabled={!targetEmployee}
                value={selectedReviewer}
                onFocus={handleFocus}
                isOptionDisabled={(option) =>
                  props.initialValues?.disabledReviewers
                    .map((e) => e.id)
                    .includes(option.id) ?? true
                }
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-8 py-2 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Performance Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
