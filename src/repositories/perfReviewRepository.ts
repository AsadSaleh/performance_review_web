
export async function submitPerformanceReview(prId: string, body: any) {
  try {
    const res = await fetch("", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({}),
    });
  } catch (error) {
    
  }
}