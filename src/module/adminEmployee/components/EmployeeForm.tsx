import { createEmployee } from "../../../repositories/employeeRepository";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";

export type EmployeeFormValues = {
  name: string;
  department: string;
  city: string;
};

type EmployeeFormProps = {
  initialValues?: Partial<EmployeeFormValues>;
  onSubmit: (v: EmployeeFormValues) => void;
};

export default function EmployeeForm(props: EmployeeFormProps) {
  const { register, handleSubmit } = useForm<EmployeeFormValues>({
    defaultValues: props.initialValues ?? {},
  });

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <FormGroup className="mt-2">
        <label>Full Name</label>
        <input
          {...register("name", { required: true })}
          id="fullname"
          placeholder="John Doe"
          required
        />
      </FormGroup>
      <FormGroup className="mt-2">
        <label>Department</label>
        <input
          {...register("department")}
          id="department"
          placeholder="Sales Team"
        />
      </FormGroup>
      <FormGroup className="mt-2">
        <label>City</label>
        <input {...register("city")} id="city" placeholder="Jakarta" />
      </FormGroup>

      <div className="d-flex justify-content-end">
        <Button type="submit" color="primary" className="mt-5">
          {props.initialValues ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
}
