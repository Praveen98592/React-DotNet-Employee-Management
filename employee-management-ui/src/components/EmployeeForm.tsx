import { Gender, type Gender as GenderType } from "../models/Employee";
import type { Department } from "../models/Department";

type EmployeeFormProps = {
  name: string;
  setName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  salary: string;
  setSalary: (value: string) => void;

  gender: GenderType;
  setGender: (value: GenderType) => void;

  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;

  isActive: boolean;
  setIsActive: (value: boolean) => void;

  departmentId: number;
  setDepartmentId: (value: number) => void;

  departments: Department[];

  editingEmployeeId: number | null;

  addEmployee: () => void;
  updateEmployee: () => void;

  validationErrors: {
    name: string;
    email: string;
    salary: string;
    dateOfBirth: string;
    departmentId: string;
  };
};

export const EmployeeForm = ({
  name,
  setName,
  email,
  setEmail,
  salary,
  setSalary,
  gender,
  setGender,
  dateOfBirth,
  setDateOfBirth,
  isActive,
  setIsActive,
  departmentId,
  setDepartmentId,
  departments,
  editingEmployeeId,
  addEmployee,
  updateEmployee,
  validationErrors,
}: EmployeeFormProps) => {
  return (
    <div className="employee-form-card">
      <h2>Employee Details</h2>

      <div className="form-grid">
        <div className="form-field">
          <label className="field-label">Employee Name</label>
          <input
            type="text"
            placeholder="Employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {validationErrors.name && (
            <div className="validation-error">{validationErrors.name}</div>
          )}
        </div>

        <div className="form-field">
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {validationErrors.email && (
            <div className="validation-error">{validationErrors.email}</div>
          )}
        </div>

        <div className="form-field">
          <label className="field-label">Salary</label>
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          {validationErrors.salary && (
            <div className="validation-error">{validationErrors.salary}</div>
          )}
        </div>

        <div className="form-field">
          <label className="field-label">Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                checked={gender === Gender.Male}
                onChange={() => setGender(Gender.Male)}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                checked={gender === Gender.Female}
                onChange={() => setGender(Gender.Female)}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                checked={gender === Gender.Other}
                onChange={() => setGender(Gender.Other)}
              />
              Other
            </label>
          </div>
        </div>

        <div>
          <label className="field-label">
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </label>

          {validationErrors.dateOfBirth && (
            <div className="validation-error">
              {validationErrors.dateOfBirth}
            </div>
          )}
        </div>

        <div className="form-field">
          <label className="field-label">Status</label>
          <label className="active-option">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Is Active
          </label>
        </div>

        <div>
          <label className="field-label">Department</label>

          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(Number(e.target.value))}
          >
            <option value={0}>Select Department</option>

            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.departmentName}
              </option>
            ))}
          </select>

          {validationErrors.departmentId && (
            <div className="validation-error">
              {validationErrors.departmentId}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={editingEmployeeId === null ? addEmployee : updateEmployee}
      >
        {editingEmployeeId === null ? "Add Employee" : "Update Employee"}
      </button>
    </div>
  );
};
