import axios from "axios";
import { Order, OrderResponse } from "./types";

const API_URL = "https://dummy-api-topaz.vercel.app";

export const submitOrder = async (order: Order): Promise<OrderResponse> => {
  try {
    const response = await axios.post(`${API_URL}/orders`, order, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit order");
  }
};
