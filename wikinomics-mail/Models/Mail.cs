using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace wikinomics_mail.Models
{
    //A mail being sent out to the mailing list
    public class Mail
    {
        public int Id { get; set; }

        public string Address { get; set; }

        //Email titel
        [RegularExpression(@"^.{10,200}$")]
        public string Titel { get; set; }

        //Email body
        [MinLength(10), MaxLength(2000)]
        public string Body { get; set; }

        public DateTime Date { get; set; }
    }
}
