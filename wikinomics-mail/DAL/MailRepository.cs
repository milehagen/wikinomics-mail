using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using wikinomics_mail.Models;
using Microsoft.EntityFrameworkCore;
using Castle.Core.Internal;

namespace wikinomics_mail.DAL
{
    class MailRepository : IMailRepository
    {
        private readonly MailDBContext _db;

        public MailRepository(MailDBContext db)
        {
            _db = db;
        }

        public async Task<List<Mail>> GetAll()
        {
            try
            {
                List<Mail> allMails = await _db.Mails.ToListAsync();
                if (allMails.IsNullOrEmpty())
                {
                    return null;
                }
                return allMails;
            }
            catch
            {
                return null;
            }
        }


        public async Task<bool> TestMail(Mail mail)
        {
            var fromAddress = new System.Net.Mail.MailAddress("NORWAY.ITPE3200@gmail.com", "NOR-WAY");
            var fromPassword = "*c*S%vX6PSXr6mw9tjy!tstfF";
            var toAddress = new System.Net.Mail.MailAddress("fail@fail.com");

            SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587);
            MailClient.EnableSsl = true;
            MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailClient.UseDefaultCredentials = false;
            MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
            MailClient.Timeout = 20000;


            //If Address is NOT empty, it's a test
            if (mail.Address != null)
            {
                try
                {
                    using (MailMessage emailMessage = new MailMessage())
                    {
                        toAddress = new System.Net.Mail.MailAddress(mail.Address);
                        emailMessage.To.Add(toAddress);
                        emailMessage.From = fromAddress;
                        emailMessage.Subject = mail.Titel;
                        emailMessage.Body = mail.Body;
                        emailMessage.Priority = MailPriority.Normal;
                        emailMessage.IsBodyHtml = true;

                        try
                        {
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
                catch
                {
                    return false;
                }
            }
            //Else it's for the mailing list
            else
            {
                foreach (var obj in _db.MailAddresses)
                {
                    string unsubscribeURL = "<a href='https://localhost:44328/unsubscribe'?mail=" + obj.UniqueId;
                    try
                    {
                        using (MailMessage emailMessage = new MailMessage())
                        {
                            toAddress = new System.Net.Mail.MailAddress(mail.Address);
                            emailMessage.To.Add(toAddress);
                            emailMessage.From = fromAddress;
                            emailMessage.Subject = mail.Titel;
                            emailMessage.Body = mail.Body + unsubscribeURL;
                            emailMessage.Priority = MailPriority.Normal;
                            emailMessage.IsBodyHtml = true;

                            try
                            {
                                await MailClient.SendMailAsync(emailMessage);
                            }
                            catch (Exception e)
                            {
                                System.Diagnostics.Debug.WriteLine(e);
                                return false;
                            }
                        }
                    }
                    catch
                    {
                        return false;
                    }
                }
            }
            MailClient.Dispose();
            return true;
        }


        public async Task<bool> SendMail(Mail mail)
        {
            using (MailMessage emailMessage = new MailMessage())
            {
                var fromAddress = new System.Net.Mail.MailAddress("NORWAY.ITPE3200@gmail.com", "NOR-WAY");
                var fromPassword = "*c*S%vX6PSXr6mw9tjy!tstfF";
                var toAddress = new System.Net.Mail.MailAddress("fail@fail.com");


                //If Address is NOT empty, it's a test
                if (mail.Address != null)
                {
                    try
                    {
                        toAddress = new System.Net.Mail.MailAddress(mail.Address);
                        emailMessage.To.Add(toAddress);
                    }
                    catch
                    {
                        return false;
                    }
                }
                //Adding everyone on the mailing list
                else
                {
                    foreach (var obj in _db.MailAddresses)
                    {
                        try
                        {
                            toAddress = new System.Net.Mail.MailAddress(obj.Address);
                            emailMessage.To.Add(toAddress);
                        }
                        catch
                        {
                            return false;
                        }
                    }
                }

                emailMessage.From = fromAddress;
                emailMessage.Subject = mail.Titel;
                emailMessage.Body = mail.Body;
                emailMessage.Priority = MailPriority.Normal;
                emailMessage.IsBodyHtml = true;

                using (SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587))
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

        public async Task<bool> LogMail(Mail inMail)
        {
            try
            {
                var newMail = new Mail
                {
                    Titel = inMail.Titel,
                    Body = inMail.Body,
                    Date = inMail.Date
                };

                await _db.Mails.AddAsync(newMail);
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
