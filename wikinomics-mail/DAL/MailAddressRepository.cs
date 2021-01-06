using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wikinomics_mail.DAL
{
    class MailAddressRepository : IMailAddressRepository
    {
        private readonly MailDBContext _db;

        public MailAddressRepository(MailDBContext db)
        {
            _db = db;
        }
    }
}
