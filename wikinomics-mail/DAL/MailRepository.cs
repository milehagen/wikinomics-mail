using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wikinomics_mail.DAL
{
    class MailRepository : IMailRepository
    {
        private readonly MailDBContext _db;

        public MailRepository(MailDBContext db)
        {
            _db = db;
        }
    }
}
