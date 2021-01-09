using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wikinomics_mail.Models
{
    public class Admin
    {
        public int Id { get; set; }

        public string Username { get; set; }
        //Never saved in DB, used to generate hash and check on backend
        public string Password { get; set; }
    }
}
