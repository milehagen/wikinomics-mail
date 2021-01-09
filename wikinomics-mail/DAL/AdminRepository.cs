using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
