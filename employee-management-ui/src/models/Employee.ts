export const Gender = {
  Male: 0,
  Female: 1,
  Other: 2,
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Employee {
  employeeId: number;
  name: string;
  email: string;
  salary: number;
  gender: Gender;
  dateOfBirth: string;
  isActive: boolean;
  departmentId: number;
  departmentName: string;
}
