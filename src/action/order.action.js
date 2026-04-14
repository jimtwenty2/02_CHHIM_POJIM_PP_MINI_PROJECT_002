"use server";

import {
  createOrderService,
  getAllOrdersService,
} from "@/service/order.service";
import { revalidateTag } from "next/cache";

export async function createOrderAction(cartItems, userId) {
  try {
    const payload = {
      orderDetailRequests: cartItems.map((item) => ({
        productId: item.productId,
        orderQty: item.quantity,
      })),
    };
    const result = await createOrderService(payload);
    revalidateTag("orders");
    return { success: true, payload: result.payload };
  } catch (error) {
    console.error("Order Action Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function getAllOrdersAction() {
  try {
    const data = await getAllOrdersService();

    if (data && data.payload) {
      return {
        success: true,
        payload: data.payload,
      };
    }

    return {
      success: false,
      payload: [],
      error: "No orders found",
    };
  } catch (error) {
    console.error("Fetch Orders Action Error:", error.message);
    return {
      success: false,
      payload: [],
      error: error.message || "Failed to load orders",
    };
  }
}
