using Microsoft.AspNetCore.Http;
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
        private const string _loggedIn = "";

        public MailController(IMailRepository db, ILogger<MailController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Mail> allMails = await _db.GetAll();
            return Ok(allMails);
        }



        [HttpPost("/SendMail")]
        [Route("SendMail")]
        public async Task<ActionResult> SendMail(Mail mail)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.SendMail(mail);
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
        public async Task<ActionResult> LogMail(Mail mail)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.LogMail(mail);
                if (!resultOK)
                {
                    return BadRequest("Mail could not be logged");
                }
                return Ok("Mail logged");
            }
            return BadRequest("Wrong input validation");
        }

    }
}
