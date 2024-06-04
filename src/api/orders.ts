import axios from "axios";
import { OrderItem, OrderResponse } from "./types";

const API_URL = "https://dummy-api-topaz.vercel.app";

export const submitOrder = async (order: OrderItem): Promise<OrderResponse> => {
  try {
    const response = await axios.post(`${API_URL}/orders`, order, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response from API:", error.response.data);
      throw new Error(error.response.data.message || "Failed to submit order");
    }
    throw new Error("Failed to submit order");
  }
};
