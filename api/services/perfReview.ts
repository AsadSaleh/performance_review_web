import { RowDataPacket } from "mysql2/promise";
import type { Employee } from "../../globals";
import { pool, query } from "./db";

interface PerfReviewFromDb extends RowDataPacket {
  id: number;
  status: "pending" | "completed";
  target_employee_id: number;
  reviewer_id: number;
}

interface GetPerformanceReviews {
  targetEmployee: Employee;
  status: "pending" | "completed";
}

interface EmployeeFromDb extends RowDataPacket {
  id: number;
  name: string;
  email?: string;
  department?: string;
  city?: string;
}

interface PrToClient {
  targetEmployee: Employee;
  reviewers: Employee[];
}

type MapStringDynamic = { [param: string]: any };

export async function getPerformanceReviews(): Promise<
  GetPerformanceReviews[]
> {
  const [prs] = await pool.query<PerfReviewFromDb[]>(
    `SELECT target_employee_id, GROUP_CONCAT(status) as "status" FROM performance_review GROUP BY target_employee_id;`
  );
  console.log(
    prs.map((pr) => ({
      ...pr,
      status: pr.status.split(",").every((e) => e == "completed")
        ? "completed"
        : "pending",
    }))
  );

  // const x = prs.reduce((acc: MapStringDynamic, cur) => {
  //   const id = cur.target_employee_id.toString();
  //   acc[id] = acc[id] || [];
  //   acc[id] = acc[id].concat(cur);
  //   return acc;
  // }, {});

  // const y = Object.keys(x).map((key) => {
  //   const id: number = +key;
  // });

  // const [rows2] = await pool.query<EmployeeFromDb[]>(
  //   `SELECT * FROM employee WHERE id=?`,
  //   [1]
  // );

  return [];
}

export async function getPerformanceReviewById(id: number) {
  const [rows] = await pool.query<PerfReviewFromDb[]>(
    `SELECT * FROM performance_review WHERE id=?`,
    [id]
  );
  return rows[0];
}

export async function getPerformanceReviewByEmployeeId(
  targetEmployeeId: number
): Promise<PrToClient> {
  const [targetEmployee] = await pool.query<EmployeeFromDb[]>(
    `SELECT * FROM employee WHERE id IN(SELECT target_employee_id FROM performance_review WHERE target_employee_id=?)`,
    [targetEmployeeId]
  );
  const [reviewers] = await pool.query<EmployeeFromDb[]>(
    `SELECT * FROM employee WHERE id IN(SELECT reviewer_id FROM performance_review WHERE target_employee_id=?)`,
    [targetEmployeeId]
  );

  return {
    targetEmployee: targetEmployee[0],
    reviewers,
  };
}

export async function createPerformanceReview({
  target_employee_id,
  reviewer_ids,
}: {
  target_employee_id: number;
  reviewer_ids: number[];
}) {
  try {
    reviewer_ids.forEach(async (reviewer_id) => {
      const result = await query(
        `INSERT INTO performance_review
        (target_employee_id, reviewer_id, status)
        VALUES
        (?, ?, ?)`,
        [target_employee_id, reviewer_id, "pending"]
      );
      console.log("result:", result);
    });
    console.log("yeah");
    return "performance_review created successfully";
  } catch (error) {
    console.log("nooooo");
    return "Error when creating performance_review";
  }
}

export async function updatePerformanceReview(
  id: number,
  { name, department, city, email }: Employee
) {
  const result = await query(
    `UPDATE performance_review
    SET target_employee_id=?, reviewer_id=?, status=? 
    WHERE id=?`,
    [name, department, city, email, id]
  );

  let message = "Error when updating performance_review";

  if (result) {
    message = "performance_review updated successfully";
  }

  return { message };
}

export async function deletePerformancereivew(id: number) {
  const result = await query(`DELETE FROM performance_review WHERE id=?`, [id]);

  let message = "Error in deleting performance_review";

  if (result) {
    message = "performance_review deleted successfully";
  }

  return { message };
}
