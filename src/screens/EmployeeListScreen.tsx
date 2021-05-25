import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../models/employee";
import { getEmployees } from "../repositories/employeeRepository";

export default function EmployeeListScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Employee[]>([]);

  async function getDataFromServer() {
    const data = await getEmployees();
    setData(data ?? []);
    setLoading(false);

    console.log("data bentuknya apa sih?");
    console.table(data);
  }

  useEffect(() => {
    getDataFromServer();
    // console.log("Aku dipanggil dari useEffect");
  }, []);

  return (
    <div>
      {loading ? "Loading nich...." : null}
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Fullname</td>
            <td>City</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address?.city}</td>
              <td>
                <Link to={`/employee-detail/${item.id}`}>
                  <button>Go to Detail</button>
                </Link>
                <button />
                <button />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
