import type { Department } from "../models/Department";

const API_URL = "http://localhost:5073/api/departments";

export const getDepartments = async (): Promise<Department[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load departments");
  }

  return await response.json();
};
