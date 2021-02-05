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
    public class FeedbackController : ControllerBase 
    {
        private readonly IFeedbackRepository _db;
        private readonly ILogger<FeedbackController> _log;

        public FeedbackController(IFeedbackRepository db, ILogger<FeedbackController> log){
            _db = db;
            _log = log;
        }

        [HttpPost]
        public async Task<ActionResult> Save(Feedback feedback) {
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Save(feedback);
                if (!returOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Feedback> allFeedbacks = await _db.GetAll();
            return Ok(allFeedbacks);
        }

        

    }
}
