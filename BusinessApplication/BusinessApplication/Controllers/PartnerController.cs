using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

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
                    GetPartnerDependencies(value, connections);

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

        [Route("partners/view/{id}")]
        [HttpGet]
        public IHttpActionResult SinglePartner(int ID)
        {
            using (var context = new BusinessDBEntities())
            {
                Partner requiredPartner = context.Partners.Find(ID);
                List<Object> connections = new List<Object>();
                GetPartnerDependencies(requiredPartner, connections);

                Object partner = new
                {
                    ID = requiredPartner.ID,
                    Name = requiredPartner.Name,
                    Email = requiredPartner.Email,
                    Phone = requiredPartner.Phone,
                    Partners = connections
                };

                return Ok(partner);
            }     
        }

        [Route("partners/remove/{id}")]
        [HttpGet]
        public IHttpActionResult RemovePartner(int id)
        {
            using (var context = new BusinessDBEntities())
            {
                Partner partner = new Partner { ID = id };
                context.Partners.Attach(partner);
                context.Partners.Remove(partner);
                context.SaveChanges();

                return Ok();
            }
        }

        [Route("partners/update")]
        [HttpPost]
        public IHttpActionResult UpdatePartner(JObject partner)
        {
            int partnerID = Convert.ToInt32(partner["ID"].ToString());
            string partnerName = partner["Name"].ToString();
            string partnerEmail = partner["Email"].ToString();
            string partnerPhone = partner["Phone"].ToString();

            using (var context = new BusinessDBEntities())
            {
                Partner partnerToUpdate = context.Partners.Find(partnerID);
                partnerToUpdate.Name = partnerName;
                partnerToUpdate.Email = partnerEmail;
                partnerToUpdate.Phone = partnerPhone;

                // Removing partner dependencies
                context.Connections.RemoveRange(context.Connections.Where(x => x.PartnerID == partnerID));
                context.SaveChanges();

                AddPartnerDependencies(partner, partnerID);

                return Ok();
            }
        }

        [Route("partners/add")]
        [HttpPost]
        public IHttpActionResult AddPartner(JObject partner)
        {
            Partner newPartner = new Partner {
                Name = partner["Name"].ToString(),
                Email = partner["Email"].ToString(),
                Phone = partner["Phone"].ToString()
            };

            using (var context = new BusinessDBEntities())
            {
                context.Partners.Add(newPartner);
                context.SaveChanges();

                AddPartnerDependencies(partner, newPartner.ID);
                context.SaveChanges();

                return Ok();
            }
        }

        private static void GetPartnerDependencies(Partner value, List<object> connections)
        {
            // Getting the partners
            foreach (Connection connection in value.Connections)
            {
                // Getting the supervisors
                List<Object> supervisors = new List<Object>();

                foreach (Supervisor supervisor in connection.Employee.Supervisors)
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
        }

        private static void AddPartnerDependencies(JObject partner, int partnerID)
        {
            using (var context = new BusinessDBEntities())
            {
                JArray employees = partner["Partners"] as JArray;

                foreach (JObject employee in employees)
                {
                    context.Connections.Add(
                        new Connection
                        {
                            EmployeeID = Convert.ToInt32(employee["ID"].ToString()),
                            PartnerID = partnerID
                        });
                }

                context.SaveChanges();
            }
        }

    }
}
