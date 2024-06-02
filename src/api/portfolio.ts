import axios from "axios";
import { Portfolio } from "./types";

const API_URL = "https://dummy-api-topaz.vercel.app";

export const getPortfolio = async (): Promise<Portfolio[]> => {
  try {
    const response = await axios.get(`${API_URL}/portfolio`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch portfolio");
  }
};
