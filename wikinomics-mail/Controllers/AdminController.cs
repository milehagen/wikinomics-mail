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
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _db;
        private readonly ILogger<AdminController> _log;
        private const string _loggedIn = "";

        public AdminController(IAdminRepository db, ILogger<AdminController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpPost("/LogIn")]
        [Route("LogIn")]
        public async Task<ActionResult> LogIn(Admin admin)
        {
            if (ModelState.IsValid)
            {
                bool resultOK = await _db.LogIn(admin);
                if (!resultOK)
                {
                    _log.LogInformation("Logg in failed");
                    HttpContext.Session.SetString(_loggedIn, "");
                    return Ok(false);
                }
                HttpContext.Session.SetString(_loggedIn, "Logged In");
                return Ok(true);
            }
            _log.LogInformation("Wrong input validation");
            return BadRequest("Wrong input validation");
        }

        [HttpGet("/LogOut")]
        [Route("LogOut")]
        public void LogOut()
        {
            HttpContext.Session.SetString(_loggedIn, "");
        }

        [HttpGet("/CheckLogIn")]
        [Route("CheckLogIn")]
        public ActionResult CheckLogIn()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggedIn)))
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }

        [HttpGet("/GetAll")]
        [Route("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggedIn)))
            {
                return Unauthorized("Ikke innlogget");
            }
            List<Mail> allMails = await _db.GetAll();
            return Ok(allMails);
        }



        [HttpPost("/SendMail")]
        [Route("SendMail")]
        public async Task<ActionResult> SendMail(Mail mail)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggedIn)))
            {
                return Unauthorized("Ikke innlogget");
            }

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
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggedIn)))
            {
                return Unauthorized("Ikke innlogget");
            }

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
