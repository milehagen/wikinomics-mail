using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public interface IStatisticRepository
    {
        public Task<Statistic> GetStatistic();

        public Task<bool> UpdateStatistic(Statistic statistic);
    }
}
