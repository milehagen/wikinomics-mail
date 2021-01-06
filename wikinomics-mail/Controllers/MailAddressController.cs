﻿using Microsoft.AspNetCore.Mvc;
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
    public class MailAddressController : ControllerBase
    {
        private readonly IMailAddressRepository _db;
        private readonly ILogger<MailAddressController> _log;

        public MailAddressController(IMailAddressRepository db, ILogger<MailAddressController> log)
        {
            _db = db;
            _log = log;
        }
    }
}
