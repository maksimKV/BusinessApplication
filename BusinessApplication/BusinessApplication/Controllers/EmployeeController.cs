using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessApplication;
using Newtonsoft.Json.Linq;
using System.Collections;

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
        public IHttpActionResult RemoveEmployee(int id)
        {
            using (var context = new BusinessDBEntities())
            {
                Employee employee = new Employee { ID = id };
                context.Employees.Attach(employee);
                context.Employees.Remove(employee);
                context.SaveChanges();

                return Ok();
            }
        }

        [Route("employees/update")]
        [HttpPost]
        public IHttpActionResult UpdateEmployee(JObject employee)
        {
            int employeeID = Convert.ToInt32(employee["ID"].ToString());
            string employeeName = employee["Name"].ToString();
            string employeePosition = employee["Position"].ToString();

            JArray subordinates = employee["Subordinates"] as JArray;
            JArray supervisors = employee["Supervisor"] as JArray;
            JArray partners = employee["Partners"] as JArray;

            using (var context = new BusinessDBEntities())
            {
                Employee employeeToUpdate = context.Employees.Find(employeeID);
                employeeToUpdate.Name = employeeName;
                employeeToUpdate.Position = employeePosition;

                // Removing employee dependencies
                context.Supervisors.RemoveRange(context.Supervisors.Where(x => x.SupervisorID == employeeID));
                context.Supervisors.RemoveRange(context.Supervisors.Where(x => x.EmployeeID == employeeID));
                context.Connections.RemoveRange(context.Connections.Where(x => x.EmployeeID == employeeID));

                // Adding new employee dependencies
                foreach (JObject supervisor in supervisors)
                {
                    context.Supervisors.Add(
                        new Supervisor {
                            SupervisorID = Convert.ToInt32(supervisor["ID"].ToString()),
                            EmployeeID = employeeID
                        });
                }

                // Adding new employee dependencies
                foreach (JObject subordinate in subordinates)
                {
                    context.Supervisors.Add(
                        new Supervisor
                        {
                            SupervisorID = employeeID,
                            EmployeeID = Convert.ToInt32(subordinate["ID"].ToString())
                        });
                }

                // Adding new employee dependencies
                foreach (JObject partner in partners)
                {
                    context.Connections.Add(
                        new Connection
                        {
                            EmployeeID = employeeID,
                            PartnerID = Convert.ToInt32(partner["ID"].ToString())
                        });
                }

                context.SaveChanges();
                return Ok();
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
