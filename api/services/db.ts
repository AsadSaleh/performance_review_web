import mysql from "mysql2/promise";
import config from "../config";



export async function query(sql: string, params?: any | any[] | { [param: string]: any }) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
}
