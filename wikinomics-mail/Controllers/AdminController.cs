﻿using Microsoft.AspNetCore.Http;
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
        private const string _loggedIn = "";//LOOK AT THIS

        public AdminController(IAdminRepository db, ILogger<AdminController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpPost]
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

        public void LogOut()
        {
            HttpContext.Session.SetString(_loggedIn, "");
        }

        [HttpGet]
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
    }
}
