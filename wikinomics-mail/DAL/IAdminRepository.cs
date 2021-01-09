using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public interface IAdminRepository
    {
        public Task<bool> LogIn(Admin admin);
    }
}
