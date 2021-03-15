using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using knowone.Models;

namespace knowone.DAL
{
    public interface IStatisticRepository
    {
        public Task<Statistic> GetStatistic();

        public Task<bool> UpdateStatistic(Statistic statistic);
    }
}
