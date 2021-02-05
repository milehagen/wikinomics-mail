using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    class FeedbackRepository : IFeedbackRepository
    {
        private readonly MailDBContext _db;
        private List<Feedback> allFeedbacks;
        public FeedbackRepository(MailDBContext db) {
            _db = db;
        }


        public async Task<bool> Save(Feedback feedback) {

            try {
                var newFeedback = new Feedback();
                newFeedback.Id = feedback.Id;
                newFeedback.Message = feedback.Message;
                _db.Feedbacks.Add(newFeedback);
                await _db.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        } 

        public async Task<List<Feedback>> GetAll()
        {
            try
            {
                allFeedbacks = await _db.Feedbacks.ToListAsync();
                if (allFeedbacks.IsNullOrEmpty())
                {
                    return null;
                }
                return allFeedbacks;
            }
            catch
            {
                return null;
            }
        }
    }
     
} 