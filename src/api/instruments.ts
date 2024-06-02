import axios from "axios";
import { Instruments } from "./types";

const API_URL = "https://dummy-api-topaz.vercel.app";

export const getInstruments = async (): Promise<Instruments[]> => {
  try {
    const response = await axios.get(`${API_URL}/instruments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch instruments");
  }
};
