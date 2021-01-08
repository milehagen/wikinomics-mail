using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MailDBContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                
                MailAddress address1 = new MailAddress { Address = "magnushjk@gmail.com", UniqueId = "BullshitImMakingUp" };
                MailAddress address2 = new MailAddress { Address = "shakus89@hotmail.com", UniqueId = "SomeOtherBullshit" };

                DateTime date1 = new DateTime(2021, 08, 01);
                DateTime date2 = new DateTime(2021, 06, 01);

                Mail mail1 = new Mail { Date = date1, Titel = "Hello and welcome to my dota2 stream", Body = "The kdkdkdkdkkdkdkdkdkdkdkdkkdkdkdkdkdkdkkdkdkdk" };
                Mail mail2 = new Mail { Date = date2, Titel = "Kjører omvei for å kjøpe sigaretter", Body = "The kdkdkdkdkkdkdkdkdkdkdkdkkdkdkdkdkdkdkkdkdkdk" };

                List<MailAddress> addresses = new List<MailAddress>
                {
                    address1,
                    address2
                };

                List<Mail> sentMails = new List<Mail>
                {
                    mail1,
                    mail2
                };


                context.MailAddresses.AddRange(addresses);
                context.Mails.AddRange(sentMails);

                context.SaveChanges();

            }
        }
    }
}
