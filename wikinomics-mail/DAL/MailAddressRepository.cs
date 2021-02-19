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

        public async Task<bool> ConfirmationMailEnglish(Models.MailAddress mailAddress)
        {
            var fromAddress = new System.Net.Mail.MailAddress("norway.itpe3200@gmail.com", "KnowONE");
            var fromPassword = "*c*S%vX6PSXr6mw9tjy!tstfF";
            var toAddress = new System.Net.Mail.MailAddress("fail@fail.com");

            SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587);
            MailClient.EnableSsl = true;
            MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailClient.UseDefaultCredentials = false;
            MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
            MailClient.Timeout = 20000;


            //If Address is NOT empty
            if (mailAddress.Address != null)
            {
                try
                {
                    using (MailMessage emailMessage = new MailMessage())
                    {
                        toAddress = new System.Net.Mail.MailAddress(mailAddress.Address);
                        emailMessage.To.Add(toAddress);
                        emailMessage.From = fromAddress;
                        emailMessage.Subject = "Your E-mail Has Been Registered!";
                        emailMessage.Body = "Yay! <br/>" +
                                            "<br/>" +
                                            "How exciting that you've decided to be one of the first to try KnowONE, when it launches! <br/>" +
                                            "<br />" +
                                            "While the team prepares for the launch of KnowONE's career platform, I would love to hear YOUR career story. Feel free to send me an e-mail: milehagen@knowone.no <br/>" +
                                            "<br />" +
                                            "If you're still a student, tell me about your goals, dreams, worries, or fears about the future!  And, if you're working, tell me what you love about your job, or what you find challenging.What do you wish someone told you before you started working? <br/>" +
                                            "<br />" +
                                            "Whatever your situation is, I would love to hear from you! <br/>" +
                                            "<br />" +
                                            "Oh, and we of course welcome any feedback you have.If you see a spelling error, or a sentence that you think made no sense, tell us! And, we will make the necessary changes :) <br/>" +
                                            "<br />" +
                                            "Thanks again for signing up. I'm so excited that you will be joining us on this journey. <br/>" +
                                            "<br />" +
                                            "Cheers! <br/>" +
                                            "<br />" +
                                            "Mi Le Hagen, <br/>" +
                                            "Founder of KnowONE <br/>";
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
            MailClient.Dispose();
            return true;
        }


        public async Task<bool> ConfirmationMailNorwegian(Models.MailAddress mailAddress)
        {
            var fromAddress = new System.Net.Mail.MailAddress("norway.itpe3200@gmail.com", "KnowONE");
            var fromPassword = "*c*S%vX6PSXr6mw9tjy!tstfF";
            var toAddress = new System.Net.Mail.MailAddress("fail@fail.com");

            SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587);
            MailClient.EnableSsl = true;
            MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailClient.UseDefaultCredentials = false;
            MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
            MailClient.Timeout = 20000;


            //If Address is NOT empty
            if (mailAddress.Address != null)
            {
                try
                {
                    using (MailMessage emailMessage = new MailMessage())
                    {
                        toAddress = new System.Net.Mail.MailAddress(mailAddress.Address);
                        emailMessage.To.Add(toAddress);
                        emailMessage.From = fromAddress;
                        emailMessage.Subject = "Din e-postadresse har blitt registrert!";
                        emailMessage.Body = "Jippi! <br/>" +
                                            "<br/>" +
                                            "Så utrolig spennende at du har meldt deg på for å bli en av de første til å teste  KnowONE når vi lanserer! <br/>" +
                                            "<br />" +
                                            "Mens KnowONE-teamet gjør de forberedelsene som må til før tjenesten kan lanseres, så vil jeg gjerne vite mer om deg og  din karrierereise! Send meg gjerne en e-post til: milehagen@knowone.no <br/>" +
                                            "<br />" +
                                            "Hvis du er en student, så vil jeg høre om dine karrieremål, drømmer og eventuelt bekymringer for fremtiden. Og, dersom du er i jobb, så fortell meg gjerne hva du liker ved jobben din, og hva du eventuelt synes er utfordrende. Hva skulle du ønske at noen fortalte deg før du begynte å jobbe? <br/>" +
                                            "<br />" +
                                            "Uansett hvilken situasjon du er i, så vil jeg gjerne høre fra deg. <br/>" +
                                            "<br />" +
                                            "Og, forresten, all ris og ros er selvfølgelig mer enn velkommen. Hvis du legger merke til skrivefeil, eller synes det er noe som er helt uforståelig, eller dårlig skrevet, så fortell oss om det slik at vi kan gjøre de nødvendige endringene :) <br/>" +
                                            "<br />" +
                                            "Igjen, takk for at du meldte deg på. Jeg er så glad for at du blir med på denne reisen med meg. <br/>" +
                                            "<br />" +
                                            "Med vennlig hilsen, <br/>" +
                                            "<br />" +
                                            "Mi Le Hagen, <br/>" +
                                            "Grunlegger av KnowONE";
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
