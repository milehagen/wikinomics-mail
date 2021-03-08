using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{

    public class AdminDB
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }
    }

    public class MailDBContext : DbContext
    {
        public MailDBContext(DbContextOptions<MailDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        public DbSet<Mail> Mails { get; set; }
        public DbSet<MailAddress> MailAddresses { get; set; }

        public DbSet<AdminDB> Admins { get; set; }

        public DbSet<Statistic> Statistics { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}