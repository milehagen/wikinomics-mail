using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.DAL;
using wikinomics_mail.Models;

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

        [HttpPost("/SendTestMail")]
        [Route("SendTestMail")]
        public ActionResult SendTestMail(TestMail mail)
        {
            if (ModelState.IsValid)
            {
                var resultOK = _db.SendTestMail(mail);
                if (!resultOK)
                {
                    return BadRequest("Mail could not be sent");
                }
                return Ok("Mail sent");
            }
            return BadRequest("Wrong input validation");
        }

        [HttpPost("/LogMail")]
        [Route("LogMail")]
        public Task<ActionResult> LogMail()
        {

        }
       

    }
}
