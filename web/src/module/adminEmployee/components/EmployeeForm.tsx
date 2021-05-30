import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Container, Row, Col } from "reactstrap";

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
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <Row className="mb-2">
        <Col xs={3}>
          <label>Full Name</label>
        </Col>
        <Col xs={6}>
          <input
            {...register("name", { required: true })}
            placeholder="John Doe"
            required
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={3}>
          <label>Department</label>
        </Col>
        <Col xs={6}>
          <input
            {...register("department")}
            id="department"
            placeholder="Sales Team"
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={3}>
          <label>Phone Number</label>
        </Col>
        <Col xs={6}>
          <input
            {...register("phone")}
            id="phone"
            placeholder="+62 8787 999 666"
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={3}>
          <label>City</label>
        </Col>
        <Col xs={6}>
          <input {...register("city")} id="city" placeholder="Jakarta" />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={3}>
          <label>Email</label>
        </Col>
        <Col xs={6}>
          <input
            {...register("email")}
            id="email"
            placeholder="user@gmail.com"
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button type="submit" color="primary" className="mt-5">
          {props.initialValues ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
}
