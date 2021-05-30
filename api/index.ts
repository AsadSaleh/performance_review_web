import bodyParser from "body-parser";
import express from "express";
import employeeRoute from "./routes/employee";

const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send({
    ping: "PONG",
  });
});

app.use(bodyParser.json());
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});