import headerToken from "@/lib/headerToken";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createOrderService(orderData) {
  const headers = await headerToken();
  
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error("Full Backend Error Response:", errorBody);
    
    throw new Error(errorBody.message || `API Error: ${response.status}`);
  }

  return await response.json();
}

export async function getAllOrdersService() {
  const headers = await headerToken();
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers,
    next: { tags: ["orders"] }, 
  });
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return await response.json();
}
