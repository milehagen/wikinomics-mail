using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using knowone.Models;

namespace knowone.DAL
{
    public interface IAdminRepository
    {
        public Task<bool> LogIn(Admin admin);

        public Task<List<Mail>> GetAll();

        public Task<bool> SendMail(Mail mail);

        Task<bool> LogMail(Mail mail);
    }
}
