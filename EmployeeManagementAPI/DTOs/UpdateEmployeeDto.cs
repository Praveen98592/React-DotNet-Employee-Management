using EmployeeManagementAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementAPI.DTOs
{
    public class UpdateEmployeeDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Range(0.01, 9999999999999999.99)]
        public decimal Salary { get; set; }

        [EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        
        public bool IsActive { get; set; }

        [Range(1, int.MaxValue)]
        public int DepartmentId { get; set; }

    }
}
