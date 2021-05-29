import bodyParser from "body-parser";
import express from "express";
import employeeRoute from "./routes/employee";

const app = express();
const port = 3000;

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
