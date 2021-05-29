import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { Employee } from "../../models/employee";
import { IdParams } from "../../models/routeParams";
import { getEmployee } from "../../repositories/employeeRepository";

export default function EmployeeDetailScreen(
  props: RouteComponentProps<IdParams>
) {
  const id = props.match.params.id;
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function getEmployeeDisini() {
      const empl = await getEmployee(id);
      setEmployee(empl);
    }
    getEmployeeDisini();
  }, [id]);

  if (employee == null) {
    return <div> data kosong </div>;
  }

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center px-2">
        <h3>{employee.name}</h3>
        <div>
          <Link to={`/employee/${id}/edit`} className="mx-2">
            <Button color="success">Edit Employee</Button>
          </Link>
          <Link to={`/performance-review/new/${id}`}>
            <Button color="primary">Create Performance Review</Button>
          </Link>
        </div>
      </div>

      <Container fluid>
        <Row>
          <Col xs={3}>ID</Col>
          <Col>{employee.id}</Col>
        </Row>
        <Row>
          <Col xs={3}>Phone Number</Col>
          <Col>{employee.phone}</Col>
        </Row>
        <Row>
          <Col xs={3}>Email</Col>
          <Col>{employee.email}</Col>
        </Row>
        <Row>
          <Col xs={3}>Department</Col>
          <Col>{employee.department}</Col>
        </Row>
        <Row>
          <Col xs={3}>City</Col>
          <Col>{employee.address?.city}</Col>
        </Row>
      </Container>
    </div>
  );
}
