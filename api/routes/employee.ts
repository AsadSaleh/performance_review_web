import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employee";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.json(await getEmployees());
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await getEmployee(+req.params.id));
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await createEmployee(req.body));
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(await updateEmployee(+req.params.id, req.body));
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.json(await deleteEmployee(+req.params.id));
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
