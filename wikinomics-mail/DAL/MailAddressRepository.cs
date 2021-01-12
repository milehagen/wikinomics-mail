using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using wikinomics_mail.Models;

namespace wikinomics_mail.DAL
{
    class MailAddressRepository : IMailAddressRepository
    {
        private readonly MailDBContext _db;
        private List<MailAddress> allMails;

        public MailAddressRepository(MailDBContext db)
        {
            _db = db;
        }

        public async Task<List<MailAddress>> GetAll()
        {
            try
            {
                allMails = await _db.MailAddresses.ToListAsync();
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

        //Saves the mailaddress on the server
        public async Task<bool> Save(MailAddress email)
        {
            String emailSubstring = GetSubString(email.Address);
            //Checks to see if the substring from the email is empty or null
            if(string.IsNullOrEmpty(emailSubstring))
            {
                throw new InvalidOperationException("The substring of the email cannot be empty or null");
            }
            //Make a new email MailAddress object
           try
            {
                var newEmail = new MailAddress();
                newEmail.Address = email.Address;
                newEmail.UniqueId = MakeHash(emailSubstring);
                _db.MailAddresses.Add(newEmail);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Unsubscribes a user
        public async Task<bool> Unsubscribe(string UniqueID)
        {
            try
            {
                MailAddress address = await _db.MailAddresses.FirstOrDefaultAsync(a => a.UniqueId == UniqueID);

                if(address != null)
                {
                    _db.MailAddresses.Remove(address);
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
