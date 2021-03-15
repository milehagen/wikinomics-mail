using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using knowone.Models;

namespace knowone.DAL
{
    public interface IMailAddressRepository
    {
        bool CheckIfRegistered(MailAddress email);
        Task<bool> Save(MailAddress email);
        String MakeHash(String inp);
        String GetSubString(String inp);
        Task<bool> Unsubscribe(String UniqueID);

        Task<bool> ConfirmationMailEnglish(MailAddress address);

        Task<bool> ConfirmationMailNorwegian(MailAddress address);
    }
}
