using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using knowone.DAL;
using knowone.Models;

namespace knowone.Controllers
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
        [HttpPost("/Save")]
        [Route("Save")]
        public async Task<ActionResult> Save(MailAddress email)
        {
            System.Diagnostics.Debug.WriteLine(email.Address + " " + email.Id + " " + email.firstname + " " + email.lastname + " " + email.SendUpdates + " " + email.UniqueId);
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Save(email);
                if (!returOK)
                {
                    _log.LogInformation("Email could not be stored!");
                    return BadRequest();
                }
                _log.LogInformation("Ferdig med lagring");
                return Ok(true);
            }
            return BadRequest();
        }



        [HttpPost("/ConfirmationMailNorwegian")]
        [Route("ConfirmationMailNorwegian")]
        public async Task<ActionResult> ConfirmationMailNorwegian(MailAddress address)
        {
            var resultOK = await _db.ConfirmationMailNorwegian(address);
            if (!resultOK)
            {
                return BadRequest("");
            }
            return Ok(true);
        }

        [HttpPost("/ConfirmationMailEnglish")]
        [Route("ConfirmationMailEnglish")]
        public async Task<ActionResult> ConfirmationMailEnglish(MailAddress address)
        {
            var resultOK = await _db.ConfirmationMailEnglish(address);
            if (!resultOK)
            {
                return BadRequest("");
            }
            return Ok(true);
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
