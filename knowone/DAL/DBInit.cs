using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using knowone.Models;

namespace knowone.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MailDBContext>();

                //If tables empty, we put something in them
                if (!context.MailAddresses.Any())
                {
                    context.MailAddresses.AddRange(
                        new MailAddress
                        {
                            firstname = "maggy",
                            lastname = "moo",
                            Address = "magnushjk@gmail.com",
                            UniqueId = "BullshitImMakingUp",
                            SendUpdates = true

                        },
                        new MailAddress
                        {
                            firstname = "shaky",
                            lastname = "shoe",
                            Address = "shakus89@hotmail.com",
                            UniqueId = "SomeOtherBullshit",
                            SendUpdates = true
                        }

                    );
                }

                if (!context.Mails.Any())
                {
                    context.Mails.AddRange(
                        new Mail
                        {
                            Titel = "Hello and welcome to my dota2 stream, its amazing",
                            Body = "<h1>Title test</h1> <br/> <b>Bold and beautiful</b>",
                            Date = DateTime.Parse("2021-08-01")
                        },
                        new Mail
                        {
                            Titel = "Kjører omvei for å kjøpe sigaretter",
                            Body = "The kdkdkdkdkkdkdkdkdkdkdkdkkdkdkdkdkdkdkkdkdkdk",
                            Date = DateTime.Parse("2021-06-01")
                        }
                    );
                }

                if (!context.Admins.Any())
                {
                    AdminDB admin = new AdminDB { Username = "Admin" };

                    string password = "b53D9@Tkv85@JSCs";
                    byte[] salt = AdminRepository.GenerateSalt();
                    byte[] hash = AdminRepository.GenerateHash(password, salt);
                    admin.Password = hash;
                    admin.Salt = salt;

                    context.Admins.Add(admin);
                }

                if (!context.Statistics.Any())
                {
                    context.Statistics.Add(
                        new Statistic
                        {
                            LastSignUp = DateTime.Parse("1970-01-01"),
                            TotalSubscribes = 2,
                            TotalUnsubscribes = 0,
                            CurrentSubscribes = 2
                        });
                }

                context.SaveChanges();

            }
        }
    }
}
