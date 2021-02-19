using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    class MailAddressRepository : IMailAddressRepository
    {
        private readonly MailDBContext _db;
        public MailAddressRepository(MailDBContext db)
        {
            _db = db;
        }
        //Returns true if email is already registered
        public bool CheckIfRegistered(Models.MailAddress email)
        {
            Models.MailAddress MailFromDB = _db.MailAddresses.FirstOrDefault(e => e.Address == email.Address);
            if(MailFromDB == null)
            {
                return false;
            }
            Console.WriteLine("Email is already stored");
            return true;
         }

        //Saves the mailaddress on the server
        public async Task<bool> Save(Models.MailAddress email)
        {
            String emailSubstring = GetSubString(email.Address);
            //Checks to see if the substring from the email is empty or null
            if(string.IsNullOrEmpty(emailSubstring))
            {
                return false;
            }
            //Check if email already is registered
            if(CheckIfRegistered(email))
            {
                return false;
            }

            //Make a new email MailAddress object
           try
            {
                await _db.MailAddresses.AddAsync(new Models.MailAddress
                {
                    firstname = email.firstname,
                    lastname = email.lastname,
                    Address = email.Address,
                    UniqueId = MakeHash(emailSubstring),
                    SendUpdates = email.SendUpdates
                });
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> ConfirmationMail(Mail mail)
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





        //Unsubscribes a user
        public async Task<bool> Unsubscribe(string UniqueID)
        {
            try
            {
                Models.MailAddress address = await _db.MailAddresses.FirstOrDefaultAsync(a => a.UniqueId == UniqueID);

                if(address != null)
                {
                    address.SendUpdates = false;
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        //Hash a substring
        public String MakeHash(String inp)
        {
            String hash = "";
            var salt = Guid.NewGuid().ToString();
            inp += salt;
            using (SHA256 sha256Hash = SHA256.Create())
            {
                hash = GetHash(sha256Hash, inp);
            }
            return hash;
        }
        //Create a substring before a specific sign defined in the method
        public String GetSubString(String inp)
        {
            
            String stopAt = "@";
            if(!String.IsNullOrWhiteSpace(inp))
            {
                int location = inp.IndexOf(stopAt, StringComparison.Ordinal);

                if(location > 0)
                {
                    return inp.Substring(0, location);
                }else
                {
                    return String.Empty;
                }
            } else
            {
                return String.Empty;
            }
        }

        //This is collected directly from microsoft documentation on the ComputeHash method
        public static string GetHash(HashAlgorithm hashAlgorithm, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
     
} 
