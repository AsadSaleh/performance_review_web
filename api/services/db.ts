import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.db.host,
  username: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test();

export const pool = mysql.createPool(config.db);

export async function query(
  sql: string,
  params?: any | any[] | { [param: string]: any }
) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.query(sql, params);
  return results;
}
