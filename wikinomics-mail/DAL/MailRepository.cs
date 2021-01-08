using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    class MailRepository : IMailRepository
    {
        private readonly MailDBContext _db;

        public MailRepository(MailDBContext db)
        {
            _db = db;
        }

        public Task<>

        public async Task<bool> SendMail(Mail mail)
        {
            
            if (!mail.Addresses.Any())
            {
                mail.Addresses.AddRange(_db.MailAddresses);
            }
        }


        //Sending test mails to specified address.
        public async Task<bool> SendTestMail(TestMail mail)
        {
            using (MailMessage emailMessage = new MailMessage())
            {
                var fromAddress = new System.Net.Mail.MailAddress("NORWAY.ITPE3200@gmail.com", "NOR-WAY");
                var fromPassword = "*c*S%vX6PSXr6mw9tjy!tstfF";
                var toAddress = new System.Net.Mail.MailAddress("fail@fail.com");

                try
                {
                    toAddress = new System.Net.Mail.MailAddress(mail.TestAddress);
                }
                catch
                {
                    return false;
                }

                emailMessage.To.Add(toAddress);
                emailMessage.From = fromAddress;
                emailMessage.Subject = mail.Titel;
                emailMessage.Body = mail.Body;
                emailMessage.Priority = MailPriority.Normal;
                emailMessage.IsBodyHtml = true;

                using(SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    try
                    {
                        MailClient.EnableSsl = true;
                        MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                        MailClient.UseDefaultCredentials = false;
                        MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
                        MailClient.Timeout = 20000;
                        await MailClient.SendMailAsync(emailMessage);
                        return true;
                    }
                    catch (Exception e)
                    {
                        System.Diagnostics.Debug.WriteLine(e);
                        return false;
                    }
                }
            }
        }
    }
}
