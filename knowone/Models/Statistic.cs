using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace knowone.Models
{
    public class Statistic
    {
        [Key]
        public int Id { get; set; }

        //Last time some one signed up
        public DateTime LastSignUp { get; set; }

        //Total amount of people that have signed up
        public int TotalSubscribes { get; set; }

        //Current amount of people in the mailing list (TotalSubscribes - TotalUnsubscribes)
        public int CurrentSubscribes { get; set; }

        //Amount of people that have unsubscribed
        public int TotalUnsubscribes { get; set; }
    }
}
