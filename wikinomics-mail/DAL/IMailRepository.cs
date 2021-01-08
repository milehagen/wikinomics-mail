using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public interface IMailRepository
    {

        public Task<bool> SendMail(Mail mail);
        
        public Task<bool> SendTestMail(TestMail mail);

        //Task<bool> LogMail(Mail mail);



    }
}
