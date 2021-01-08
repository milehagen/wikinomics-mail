using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{


    public class MailDBContext : DbContext
    {
        public MailDBContext(DbContextOptions<MailDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        public DbSet<Mail> Mails { get; set; }
        public DbSet<MailAddress> MailAddresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
