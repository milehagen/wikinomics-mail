using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace wikinomics_mail.Models
{
    //Object for sending test mails
    public class TestMail
    {
        public int Id { get; set; }

        //Email titel
        [RegularExpression(@"^.{10,200}$")]
        public string Titel { get; set; }

        //Email body
        [MinLength(10), MaxLength(2000)]
        public string Body { get; set; }

        public DateTime Date { get; set; }

        public string TestAddress { get; set; }
    }
}
