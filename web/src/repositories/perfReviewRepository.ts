import {
  CreatePerformanceReviewPayload,
  FlatPerformanceReview,
  PerformanceReview,
} from "../models/performanceReview";
import * as api from "../utils/api";

export async function getPerformanceReviews(): Promise<
  FlatPerformanceReview[]
> {
  try {
    const res = await api.get(`/performance-review`);
    const json = (await res.json()) as FlatPerformanceReview[];
    console.log({ json });
    return json;
  } catch (error) {
    return [];
  }
}

export async function getEmployeePerformanceReviews(employeeId: number) {
  try {
    const res = await api.get(`/performance-review/reviewer/${employeeId}`);
    const json = await res.json();
    console.log({ json });
    return json;
  } catch (error) {
    return [];
  }
}

export async function getPerformanceReview(
  id: number
): Promise<FlatPerformanceReview | null> {
  try {
    const res = await api.get(`/performance-review/${id}`);
    const json = (await res.json()) as FlatPerformanceReview;
    console.log({ json });
    return json;
  } catch (error) {
    return null;
  }
}

export async function createPerformanceReview(
  e: CreatePerformanceReviewPayload
): Promise<PerformanceReview | null> {
  try {
    console.log("hadir");
    const response = await api.post("/performance-review", e);
    const data: PerformanceReview = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function updatePerformanceReview(
  id: number,
  e: CreatePerformanceReviewPayload
): Promise<PerformanceReview | null> {
  try {
    const response = await api.put(`/performance-review/${id}`, e);
    const data: PerformanceReview = await response.json();
    return data;
  } catch {
    return null;
  }
}

interface SubmitChoicePayload {
  QuestionId: number;
  ChoiceId: number;
  PerformanceReviewId: number;
}

export async function submitPerformanceReview(body: SubmitChoicePayload[]) {
  try {
    const res = await api.post("/performance-review/submit", body);
    return res;
  } catch (error) {
    throw error;
  }
}
