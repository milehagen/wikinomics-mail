using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public class StatisticRepository : IStatisticRepository
    {
        private readonly MailDBContext _db;

        public StatisticRepository(MailDBContext db)
        {
            _db = db;
        }

        public async Task<Statistic> GetStatistic()
        {
            try
            {
                Statistic dbStats = await _db.Statistics.FirstOrDefaultAsync(s => s.Id == 1);
                if(dbStats != null)
                {
                    return dbStats;
                }
                return null;
            }
            catch
            {
                return null;
            }

        }



        public async Task<bool> UpdateStatistic(Statistic statistic)
        {
            try
            {
                Statistic dbStats = await _db.Statistics.FirstOrDefaultAsync(s => s.Id == 1);
                if(dbStats == null)
                {
                    return false;
                }

                //Changes field based on the ones that come populated from frontend
                if(statistic.LastSignUp != null)
                {
                    dbStats.LastSignUp = statistic.LastSignUp;
                }
                if(statistic.TotalSubscribes != 0)
                {
                    dbStats.TotalSubscribes += Math.Sign(statistic.TotalSubscribes);
                    dbStats.CurrentSubscribes += Math.Sign(statistic.TotalSubscribes);
                }
                if(statistic.TotalUnsubscribes != 0)
                {
                    dbStats.TotalUnsubscribes += Math.Sign(statistic.TotalUnsubscribes);
                    dbStats.CurrentSubscribes += Math.Sign(statistic.TotalUnsubscribes);
                }

                await _db.SaveChangesAsync();
                return true;

            }
            catch
            {
                return false;
            }
        }
    }
}
