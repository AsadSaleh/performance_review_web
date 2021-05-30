import {
  PerformanceReview,
  PerformanceReviewStatus,
} from "../models/performanceReview";

export async function getPerformanceReviews(): Promise<PerformanceReview[]> {
  try {
    const str = localStorage.getItem("PerformanceReview");
    if (str == null) {
      localStorage.setItem("PerformanceReview", JSON.stringify([]));
      return [];
    }
    const data = JSON.parse(str);
    // const response = await fetch("");
    // const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getPerformanceReview(
  id: number
): Promise<PerformanceReview | null> {
  try {
    const response = await fetch(`${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function createPerformanceReview(
  e: PerformanceReview
): Promise<PerformanceReview | null> {
  try {
    const response = await fetch("");
    const data: PerformanceReview = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function updatePerformanceReview(
  e: PerformanceReview
): Promise<PerformanceReview | null> {
  try {
    const response = await fetch("");
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

export async function submitPerformanceReview(id: string, body: any) {
  try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {}
}
