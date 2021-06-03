import { useForm } from "react-hook-form";

export type EmployeeFormValues = {
  name: string;
  department: string;
  phone: string;
  city: string;
  email: string;
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
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="mb-2">
        <div>
          <label>Full Name</label>
        </div>
        <div>
          <input
            {...register("name", { required: true })}
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <div>
          <label>Department</label>
        </div>
        <div>
          <input
            {...register("department")}
            id="department"
            placeholder="Sales Team"
          />
        </div>
      </div>
      <div className="mb-2">
        <div>
          <label>City</label>
        </div>
        <div>
          <input {...register("city")} id="city" placeholder="Jakarta" />
        </div>
      </div>
      <div className="mb-2">
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            {...register("email")}
            id="email"
            placeholder="user@gmail.com"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit">
          {props.initialValues ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
