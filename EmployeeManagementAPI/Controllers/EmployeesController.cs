using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Employees
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    Salary = e.Salary,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    IsActive = e.IsActive,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department!.DepartmentName
                })
                .ToListAsync();

            return Ok(employees);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _context.Employees
                .Where(e => e.EmployeeId == id)
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    Salary = e.Salary,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    IsActive = e.IsActive,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department!.DepartmentName
                })
                .FirstOrDefaultAsync();


            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee(CreateEmployeeDto dto)
        {
            // Check whether the selected department really exists
            if (! await DepartmentExists(dto.DepartmentId))
            {
                return BadRequest("Invalid DepartmentId");
            }

            // Create Employee entity from the DTO
            var employee = new Employee
            {
                Name = dto.Name,
                Email = dto.Email,
                Salary = dto.Salary,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                IsActive = dto.IsActive,
                DepartmentId = dto.DepartmentId,
            };

            _context.Employees.Add(employee);
                   
            await _context.SaveChangesAsync();

            var result = await _context.Employees
                .Where(e => e.EmployeeId == employee.EmployeeId)
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    Salary = e.Salary,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    IsActive = e.IsActive,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department!.DepartmentName
                })
                .FirstAsync();


            return CreatedAtAction(
                nameof(GetEmployeeById),
                new { Id = employee.EmployeeId }, result
                );                       
        }
           

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            // Check whether the selected department really exists
            if (!await DepartmentExists(dto.DepartmentId))
            {
                return BadRequest("Invalid DepartmentId");
            }

            employee.Name = dto.Name;
            employee.Email = dto.Email;
            employee.Salary = dto.Salary;
            employee.Gender = dto.Gender;
            employee.DateOfBirth = dto.DateOfBirth;
            employee.IsActive = dto.IsActive;
            employee.DepartmentId = dto.DepartmentId;

            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
                
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);

            await _context.SaveChangesAsync();

            return NoContent();
        }


        private async Task<bool> DepartmentExists(int departmentId)
        {
            return await _context.Departments
                .AnyAsync(d => d.DepartmentId == departmentId);
        }
    }
}
