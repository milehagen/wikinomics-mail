using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

                context.SaveChanges();

            }
        }
    }
}
