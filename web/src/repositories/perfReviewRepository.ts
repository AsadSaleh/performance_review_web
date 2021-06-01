import {
  CreatePerformanceReviewPayload,
  PerformanceReview,
} from "../models/performanceReview";
import * as api from "../utils/api";

const dataSet1: PerformanceReview[] = [
  {
    id: 48723,
    reviewers: [
      {
        id: 832,
        name: "Asad",
      },
      {
        id: 5783,
        name: "Miaw",
      },
      {
        id: 78432,
        name: "Kucing",
      },
    ],
    targetEmployee: {
      id: 57,
      name: "Hanif",
    },
    status: "pending",
  },
  {
    id: 234,
    reviewers: [
      {
        id: 832,
        name: "Asad",
      },
    ],
    targetEmployee: {
      id: 57,
      name: "Said",
    },
    status: "pending",
  },
  {
    id: 543,
    reviewers: [
      {
        id: 832,
        name: "Asad",
      },
    ],
    targetEmployee: {
      id: 57,
      name: "Fadhil",
    },
    status: "pending",
  },
];

export async function getPerformanceReviews(): Promise<PerformanceReview[]> {
  try {
    const res = await api.get(`/performance-review`);
    const json = await res.json();
    console.log({ json });
    return dataSet1;
  } catch (error) {
    return [];
  }
}

export async function getPerformanceReview(
  id: number
): Promise<PerformanceReview | null> {
  try {
    return dataSet1[0];
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

export async function deletePerformanceReview(
  e: PerformanceReview
): Promise<true | null> {
  try {
    await api.deleteAsync("");
    return true;
  } catch {
    return null;
  }
}

export async function submitPerformanceReview(
  prId: number,
  reviewerId: number,
  body: any
) {
  try {
    const res = await api.post("", {});
    return res;
  } catch (error) {}
}
