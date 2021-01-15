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
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticRepository _db;
        private readonly ILogger<StatisticController> _log;

        public StatisticController(IStatisticRepository db, ILogger<StatisticController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> UpdateStatistic(Statistic statistic)
        {

        }

        public async Task<Statistic> GetStatistic()
        {

        }
    }
}
