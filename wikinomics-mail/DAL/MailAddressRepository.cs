using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    class MailAddressRepository : IMailAddressRepository
    {
        private readonly MailDBContext _db;

        public MailAddressRepository(MailDBContext db)
        {
            _db = db;
        }

        public async Task<bool> Save(MailAddress email)
        {
           try
            {
                var newEmail = new MailAddress();
                newEmail.Address = email.Address;
                newEmail.UniqueId = email.UniqueId;

                _db.MailAddresses.Add(newEmail);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
     
} 
