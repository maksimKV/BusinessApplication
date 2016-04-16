using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessApplication;

namespace BusinessApplication.Controllers
{
    public class EmployeeController : ApiController
    {
        [Route("employees")]
        [HttpGet]
        public IHttpActionResult AllEmployees()
        {
            List<Object> allEmployees = new List<Object>();

            using (var context = new BusinessDBEntities())
            {
                List<Employee> values = context.Employees.ToList();

                foreach (Employee value in values)
                {

                    List<Object> connections = new List<Object>();
                    List<Object> supervisors = new List<Object>();
                    List<Object> employees = new List<Object>();
                    GetEmployeeDependencies(value, connections, supervisors, employees);

                    Object employee = new
                    {
                        ID = value.ID,
                        Name = value.Name,
                        Position = value.Position,
                        Supervisor = supervisors,
                        Subordinates = employees,
                        Partners = connections
                    };

                    allEmployees.Add(employee);
                }
            }
            return Ok(allEmployees);
        }       

        [Route("employees/view/{id}")]
        [HttpGet]
        public IHttpActionResult SingleEmployee(int ID)
        {
            using (var context = new BusinessDBEntities())
            {
                Employee requiredEmployee = context.Employees.Find(ID);

                List<Object> connections = new List<Object>();
                List<Object> supervisors = new List<Object>();
                List<Object> employees = new List<Object>();
                GetEmployeeDependencies(requiredEmployee, connections, supervisors, employees);

                Object employee = new
                {
                    ID = requiredEmployee.ID,
                    Name = requiredEmployee.Name,
                    Position = requiredEmployee.Position,
                    Supervisor = supervisors,
                    Subordinates = employees,
                    Partners = connections
                };

                return Ok(employee);
            }
            
        }

        [Route("employees/remove/{id}")]
        [HttpGet]
        public void RemoveEmployee(int id)
        {
            using (var context = new BusinessDBEntities())
            {
                Employee employee = new Employee { ID = id };
                context.Employees.Attach(employee);
                context.Employees.Remove(employee);
                context.SaveChanges();
            }
        }

        private static void GetEmployeeDependencies(Employee value, List<object> connections, List<object> supervisors, List<object> employees)
        {
            // Getting the partners
            foreach (Connection connection in value.Connections)
            {
                Object partner = new
                {
                    ID = connection.Partner.ID,
                    Name = connection.Partner.Name,
                    Phone = connection.Partner.Phone,
                    Email = connection.Partner.Email
                };

                connections.Add(partner);
            }

            // Getting the supervisor
            if (value.Supervisors != null)
            {
                foreach (Supervisor manager in value.Supervisors)
                {
                    Object supervisor = new
                    {
                        ID = manager.Employee1.ID,
                        Name = manager.Employee1.Name,
                        Position = manager.Employee1.Position
                    };

                    supervisors.Add(supervisor);
                }
            }

            // Getting the subordunates, if any
            if (value.Supervisors1 != null)
            {
                foreach (Supervisor subordinate in value.Supervisors1)
                {
                    Object assistant = new
                    {
                        ID = subordinate.Employee.ID,
                        Name = subordinate.Employee.Name,
                        Position = subordinate.Employee.Position
                    };

                    employees.Add(assistant);
                }
            }
        }
    }
}
