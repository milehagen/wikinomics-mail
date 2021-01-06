using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wikinomics_mail.Models
{
    //Object created when signing up for mailing list
    public class MailAddress
    {
        //Auto increment ID in DB
        public int Id { get; set; }

        //Email address
        public string Address { get; set; }

        //A unique code used for unsubscribing from the mailing list
        public string UniqueId { get; set; }
    }
}
