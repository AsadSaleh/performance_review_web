import {
  CreatePerformanceReviewPayload,
  PerformanceReview,
} from "../models/performanceReview";

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
    const response = await fetch("http://localhost:3001/performance-review", {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await fetch(
      `http://localhost:3001/performance-review/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(e),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    await fetch("");
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
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return res;
  } catch (error) {}
}
