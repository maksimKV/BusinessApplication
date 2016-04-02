using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessApplication.Models
{
    public class BusinessApplicationModels
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class Employee : BusinessApplicationModels
    {
        public string Position { get; set; }
        public Employee Supervisor { get; set; }
        public List<Partner> Partners { get; set; }
    }

    public class Partner : BusinessApplicationModels
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Employee> Partners { get; set; }
    }
}