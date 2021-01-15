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

        [HttpPut]
        public async Task<ActionResult> UpdateStatistic(Statistic statistic)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.UpdateStatistic(statistic);

                if (!resultOK)
                {
                    return NotFound("Statistics could not be updated");
                }
                return Ok(true);
            }
            return BadRequest("Wrong input validation");
        }

        [HttpGet]
        public async Task<ActionResult> GetStatistic()
        {
            Statistic stats = await _db.GetStatistic();

            if(stats == null)
            {
                return NotFound("Statistics not found");
            }
            return Ok(stats);
        }
    }
}
