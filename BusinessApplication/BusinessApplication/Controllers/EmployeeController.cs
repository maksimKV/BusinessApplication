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

                    Object supervisor = null;
                    List<Object> employees = new List<Object>();

                    // Getting the supervisor
                    if (value.Employee1 != null)
                    {
                        supervisor = new
                        {
                            ID = value.Employee1.ID,
                            Name = value.Employee1.Name,
                            Position = value.Employee1.Position
                        };
                    }

                    // Getting the subordunates, if any
                    if (value.Employees1 != null)
                    {
                        foreach (Employee subordinate in value.Employees1)
                        {
                            Object assistant = new
                            {
                                ID = subordinate.ID,
                                Name = subordinate.Name,
                                Position = subordinate.Position
                            };

                            employees.Add(assistant);
                        }
                    }

                    Object employee = new
                    {
                        ID = value.ID,
                        Name = value.Name,
                        Position = value.Position,
                        Supervisor = supervisor,
                        Subordinates = employees,
                        Partners = connections
                    };

                    allEmployees.Add(employee);
                }
            }
            return Ok(allEmployees);
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
    }
}
