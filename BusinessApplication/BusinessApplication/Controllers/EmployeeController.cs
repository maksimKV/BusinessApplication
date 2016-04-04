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

                    List<Object> supervisors = new List<Object>();
                    //Object supervisor = null;
                    List<Object> employees = new List<Object>();

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
