using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public interface IMailAddressRepository
    {
        Task<bool> Save(MailAddress email);
        String MakeHash(String inp);
        String GetSubString(String inp);
    }
}
