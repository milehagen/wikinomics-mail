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
    public class MailAddressController : ControllerBase
    {
        private readonly IMailAddressRepository _db;
        private readonly ILogger<MailAddressController> _log;

        public MailAddressController(IMailAddressRepository db, ILogger<MailAddressController> log)
        {
            _db = db;
            _log = log;
        }
        // Sends the mailaddress to the server 
        [HttpPost]
        public async Task<ActionResult> Save(MailAddress email)
        {
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Save(email);
                if (!returOK)
                {
                    _log.LogInformation("Email could not be stored!");
                    return BadRequest();
                }
                _log.LogInformation("Ferdig med lagring");
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("unsubscribe/{UniqueID}")]
        [Route("unsubscribe/{UniqueID}")]
        public async Task<ActionResult> Unsubscribe(string UniqueID) 
        {
            var resultOK = await _db.Unsubscribe(UniqueID);
            if (!resultOK)
            {
                return NotFound("Could not unsubscribe from mailing list");
            }
            return Ok(true);
        }
    }
}
