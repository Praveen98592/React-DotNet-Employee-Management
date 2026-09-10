import type { Employee } from "../models/Employee";

const API_URL = "http://localhost:5073/api/employees";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load employees");
  }

  return await response.json();
};

export const createEmployee = async (
  employee: Omit<Employee, "employeeId" | "departmentName">,
): Promise<Employee> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return await response.json();
};

export const updateEmployee = async (
  employeeId: number,
  employee: Omit<Employee, "employeeId" | "departmentName">,
): Promise<void> => {
  const response = await fetch(`${API_URL}/${employeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (employeeId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${employeeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};
