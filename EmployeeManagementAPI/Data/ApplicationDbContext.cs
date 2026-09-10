using EmployeeManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           modelBuilder.Entity<Employee>()
                .Property(e => e.Name)
                .HasMaxLength(100);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Email)
                .HasMaxLength(200);

            modelBuilder.Entity<Employee>()
               .Property(e => e.Salary)
               .HasPrecision(18, 2);

            modelBuilder.Entity<Employee>()
                .Property(e => e.DateOfBirth)
                .HasColumnType("date");

            modelBuilder.Entity<Department>()
                .Property(d => d.DepartmentName)
                .HasMaxLength(100);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);




            modelBuilder.Entity<Department>().HasData(
            new Department
            {
                DepartmentId = 1,
                DepartmentName = "IT"
            },
            new Department
            {
                DepartmentId = 2,
                DepartmentName = "HR"
            },
            new Department
            {
                DepartmentId = 3,
                DepartmentName = "Finance"
            },
            new Department
            {
                DepartmentId = 4,
                DepartmentName = "Operations"
            }
);
        }

    }


}
