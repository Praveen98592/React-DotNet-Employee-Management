import "./App.css";
import { useEffect, useState } from "react";
import { Gender, type Employee } from "./models/Employee";
import type { Department } from "./models/Department";
import {
  createEmployee,
  deleteEmployee as deleteEmployeeApi,
  getEmployees,
  updateEmployee as updateEmployeeApi,
} from "./services/employeeService";
import { getDepartments } from "./services/departmentService";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeGrid } from "./components/EmployeeGrid";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    salary: "",
    dateOfBirth: "",
    departmentId: "",
  });

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await getDepartments();

        setDepartments(data);
      } catch (error) {
        console.error("Error loading departments:", error);
      }
    };

    const loadEmployees = async () => {
      try {
        const data = await getEmployees();

        setEmployees(data);
      } catch (error) {
        console.error("Error loading employees:", error);
      }
    };

    loadDepartments();
    loadEmployees();
  }, []);

  const validateEmployee = (): boolean => {
    const errors = {
      name: "",
      email: "",
      salary: "",
      dateOfBirth: "",
      departmentId: "",
    };

    if (name.trim() === "") {
      errors.name = "Employee Name is required";
    }

    if (email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      errors.email = "Please enter a valid Email.";
    }

    if (salary === "" || Number(salary) <= 0) {
      errors.salary = "Salary must be greater than 0.";
    }

    if (dateOfBirth === "") {
      errors.dateOfBirth = "Date of Birth is required.";
    }

    if (departmentId === 0) {
      errors.departmentId = "Please select a Department.";
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const addEmployee = async () => {
    try {
      if (!validateEmployee()) {
        return;
      }

      const newEmployee = {
        name: name,
        email: email,
        salary: Number(salary),
        gender: gender,
        dateOfBirth: dateOfBirth,
        isActive: isActive,
        departmentId: departmentId,
      };

      const createdEmployee = await createEmployee(newEmployee);

      setEmployees((currentEmployees) => [
        ...currentEmployees,
        createdEmployee,
      ]);

      showSuccessMessage("Employee added successfully.");

      setName("");
      setEmail("");
      setSalary("");
      setGender(Gender.Male);
      setDateOfBirth("");
      setIsActive(true);
      setDepartmentId(0);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const deleteEmployee = async (employeeId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployeeApi(employeeId);

      setEmployees((currentEmployees) =>
        currentEmployees.filter(
          (employee) => employee.employeeId !== employeeId,
        ),
      );

      showSuccessMessage("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const editEmployee = (e: Employee) => {
    setEditingEmployeeId(e.employeeId);

    setName(e.name);
    setEmail(e.email);
    setSalary(e.salary.toString());
    setGender(e.gender);
    setDateOfBirth(e.dateOfBirth.substring(0, 10));
    setIsActive(e.isActive);
    setDepartmentId(e.departmentId);
  };

  const updateEmployee = async () => {
    if (editingEmployeeId === null) {
      return;
    }

    if (!validateEmployee()) {
      return;
    }

    try {
      const updatedEmployee = {
        name: name,
        email: email,
        salary: Number(salary),
        gender: gender,
        dateOfBirth: dateOfBirth,
        isActive: isActive,
        departmentId: departmentId,
      };

      await updateEmployeeApi(editingEmployeeId, updatedEmployee);

      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee.employeeId === editingEmployeeId
            ? {
                ...employee,
                name,
                email,
                salary: Number(salary),
                gender,
                dateOfBirth,
                isActive,
                departmentId,
                departmentName:
                  departments.find(
                    (department) => department.departmentId === departmentId,
                  )?.departmentName ?? "",
              }
            : employee,
        ),
      );

      setEditingEmployeeId(null);

      showSuccessMessage("Employee updated successfully.");

      setName("");
      setEmail("");
      setSalary("");
      setGender(Gender.Male);
      setDateOfBirth("");
      setIsActive(true);
      setDepartmentId(0);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Employee Management System</h1>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <EmployeeForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        salary={salary}
        setSalary={setSalary}
        gender={gender}
        setGender={setGender}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        isActive={isActive}
        setIsActive={setIsActive}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        departments={departments}
        editingEmployeeId={editingEmployeeId}
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
        validationErrors={validationErrors}
      />

      <EmployeeGrid
        employees={employees}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default App;
