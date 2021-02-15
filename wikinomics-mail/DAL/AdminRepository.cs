using Castle.Core.Internal;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    public class AdminRepository : IAdminRepository
    {
        private readonly MailDBContext _db;

        public AdminRepository(MailDBContext db)
        {
            _db = db;
        }

        public static byte[] GenerateHash(string password, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        public static byte[] GenerateSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;

        }

        public async Task<bool> LogIn(Admin admin)
        {
            try
            {
                AdminDB adminFromDB = await _db.Admins.FirstOrDefaultAsync(a => a.Username == admin.Username);
                
                if(adminFromDB == null){
                    return false;
                }
                byte[] hash = GenerateHash(admin.Password, adminFromDB.Salt);
                bool ok = hash.SequenceEqual(adminFromDB.Password);

                if (ok)
                {
                    return true;
                }
                return false;

            }
            catch
            {
                return false;
            }
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


        public async Task<bool> SendMail(Mail mail)
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
                //Looping through the list, and sending mail if the want it
                foreach (var address in _db.MailAddresses)
                {
                    if (address.SendUpdates)
                    {
                        string unsubscribeURL = "\n <a href=\"https://localhost:44328/unsubscribe?mail=" + address.UniqueId + "\"" + " > Unsubscribe</a>";
                        try
                        {
                            using (MailMessage emailMessage = new MailMessage())
                            {
                                toAddress = new System.Net.Mail.MailAddress(address.Address);
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
                                    System.Diagnostics.Debug.WriteLine(e.StackTrace);
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
            }
            MailClient.Dispose();
            return true;
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
