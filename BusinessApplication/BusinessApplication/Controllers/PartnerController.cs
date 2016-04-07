using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BusinessApplication.Controllers
{
    public class PartnerController : ApiController
    {
        [Route("partners")]
        [HttpGet]
        public IHttpActionResult AllPartners()
        {
            List<Object> allPartners = new List<Object>();

            using (var context = new BusinessDBEntities())
            {
                List<Partner> values = context.Partners.ToList();

                foreach(Partner value in values)
                {
                    List<Object> connections = new List<Object>();

                    // Getting the partners
                    foreach (Connection connection in value.Connections)
                    {
                        // Getting the supervisors
                        List<Object> supervisors = new List<Object>();
                        
                        foreach(Supervisor supervisor in connection.Employee.Supervisors)
                        {
                            Object existingSupervisor = new
                            {
                                ID = supervisor.Employee1.ID,
                                Name = supervisor.Employee1.Name,
                                Position = supervisor.Employee1.Position
                            };

                            supervisors.Add(existingSupervisor);
                        }

                        Object employee = new
                        {
                            ID = connection.Employee.ID,
                            Name = connection.Employee.Name,
                            Position = connection.Employee.Position,
                            Supervisors = supervisors
                        };

                        connections.Add(employee);
                    }

                    Object partner = new
                    {
                        ID = value.ID,
                        Name = value.Name,
                        Email = value.Email,
                        Phone = value.Phone,
                        Partners = connections
                    };

                    allPartners.Add(partner);
                }
            }

            return Ok(allPartners);
        }

        [Route("partners/remove/{id}")]
        [HttpGet]
        public void RemovePartner(int id)
        {
            using (var context = new BusinessDBEntities())
            {
                Partner partner = new Partner { ID = id };
                context.Partners.Attach(partner);
                context.Partners.Remove(partner);
                context.SaveChanges();
            }
        }

    }
}
