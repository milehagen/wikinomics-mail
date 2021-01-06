using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.DAL;

namespace wikinomics_mail.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly IMailRepository _db;
        private readonly ILogger<MailController> _log;

        public MailController(IMailRepository db, ILogger<MailController> log)
        {
            _db = db;
            _log = log;
        }
    }
}
