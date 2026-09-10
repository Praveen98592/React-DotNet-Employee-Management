import { Gender, type Employee } from "../models/Employee";

type EmployeeGridProps = {
  employees: Employee[];
  editEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: number) => void;
};

const getGenderName = (gender: Employee["gender"]) => {
  switch (gender) {
    case Gender.Male:
      return "Male";
    case Gender.Female:
      return "Female";
    case Gender.Other:
      return "Other";
    default:
      return "";
  }
};

const formatDate = (date: string) => {
  if (!date) return "";

  const [year, month, day] = date.substring(0, 10).split("-");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day}-${monthNames[Number(month) - 1]}-${year}`;
};

export const EmployeeGrid = ({
  employees,
  editEmployee,
  deleteEmployee,
}: EmployeeGridProps) => {
  return (
    <>
      <h2>Employees</h2>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>₹{employee.salary.toLocaleString("en-IN")}</td>
              <td>{getGenderName(employee.gender)}</td>
              <td>{formatDate(employee.dateOfBirth)}</td>
              <td>{employee.departmentName}</td>
              <td>
                <span
                  className={
                    employee.isActive ? "status-active" : "status-inactive"
                  }
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <button
                  className="edit-button"
                  onClick={() => editEmployee(employee)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteEmployee(employee.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
