//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BusinessApplication
{
    using System;
    using System.Collections.Generic;
    
    public partial class Connection
    {
        public int ID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public Nullable<int> PartnerID { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Partner Partner { get; set; }
    }
}
