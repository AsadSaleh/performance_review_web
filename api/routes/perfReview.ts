import { Router } from "express";
import {
  getPerformanceReviews,
  getPerformanceReviewById,
  createPerformanceReview,
  updatePerformanceReview,
  deletePerformancereivew,
  getPerformanceReviewByEmployeeId,
} from "../services/perfReview";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.json(await getPerformanceReviews());
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await getPerformanceReviewById(+req.params.id));
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/employee-id/:id", async (req, res) => {
  try {
    res.json(await getPerformanceReviewByEmployeeId(+req.params.id));
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await createPerformanceReview(req.body));
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(await updatePerformanceReview(+req.params.id, req.body));
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.json(await deletePerformancereivew(+req.params.id));
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
