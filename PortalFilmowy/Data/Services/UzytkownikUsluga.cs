using System;
using System.Collections.Generic;
using System.Linq;
using PortalFilmowy.Models;
using System.Security.Cryptography;
using System.Text;

namespace PortalFilmowy.Data.Services
{
    public class UzytkownikUsluga
    {
        private MyDbContext _context;
        public UzytkownikUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddUzytkownik(UzytkownikVM uzytkownik)
        {
            using (SHA256 sha256Hash = SHA256.Create()){
                string hash = getHash(sha256Hash, uzytkownik.Haslo);
                if (VerifyHash(sha256Hash, uzytkownik.Haslo, hash)){
                    Console.WriteLine("Hash taki sam.");
                    var _uzytkownik= new Uzytkownik()
                    {
                        Login = uzytkownik.Login,
                        Haslo = hash,
                        Email = uzytkownik.Email,
                        TypKonta = uzytkownik.TypKonta
                    };
                    _context.Uzytkownik.Add(_uzytkownik);
                    _context.SaveChanges();
                } else{
                Console.WriteLine("Hash nie jest taki sam!.");
                }
            }
        }
        public void AddUzytkownik2(UzytkownikVM uzytkownik) // rejestracja
        {
            using (SHA256 sha256Hash = SHA256.Create()){
                string hash = getHash(sha256Hash, uzytkownik.Haslo);
                if (VerifyHash(sha256Hash, uzytkownik.Haslo, hash)){
                    Console.WriteLine("Hash taki sam.");
                    var _uzytkownik= new Uzytkownik()
                    {
                        Login = uzytkownik.Login,
                        Haslo = hash,
                        Email = uzytkownik.Email,
                        TypKonta = 3
                    };
                    _context.Uzytkownik.Add(_uzytkownik);
                    _context.SaveChanges();
                } else{
                    Console.WriteLine("Hash nie jest taki sam!.");
                }
            }
        }
        public List<Uzytkownik> getAllUzytkownik() => _context.Uzytkownik.ToList();
        public Uzytkownik getUzytkownikById(int uzytkownikId)
        {
            return _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
        }
        public Uzytkownik updateUzytkownikById(int uzytkownikId, UzytkownikVM uzytkownik)
        {
            using (SHA256 sha256Hash = SHA256.Create()){
                string hash = getHash(sha256Hash, uzytkownik.Haslo);
                if (VerifyHash(sha256Hash, uzytkownik.Haslo, hash)){
                    Console.WriteLine("Hash taki sam.");
                    var _uzytkownik = _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
                    if(_uzytkownik!=null)
                    {
                    _uzytkownik.Login = uzytkownik.Login;
                    _uzytkownik.Haslo = hash;
                    _uzytkownik.Email = uzytkownik.Email;
                    _uzytkownik.TypKonta = uzytkownik.TypKonta;
                    _context.SaveChanges();
                    }
                    return _uzytkownik;  
                } else{
                    Console.WriteLine("Hash nie jest taki sam!.");
                    return null;
                }
            }   
        }
        public Uzytkownik updateUzytkownikById2(int uzytkownikId, UzytkownikVM uzytkownik)
        {
            var _uzytkownik = _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
            if(_uzytkownik!=null)
            {
                _uzytkownik.TypKonta = uzytkownik.TypKonta;
                _context.SaveChanges();
            }
            return _uzytkownik;
        }
        public void deleteUzytkownikById(int uzytkownikId)
        {
            var _uzytkownik = _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
            if(_uzytkownik!=null)
            {
                _context.Uzytkownik.Remove(_uzytkownik);
                _context.SaveChanges();
            }
        }
        private static string getHash(HashAlgorithm hashAlgorithm, string input){
            
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++){
            sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();

        }   
        private static bool VerifyHash(HashAlgorithm hashAlgorithm, string input, string hash){
            var hashOfInput = getHash(hashAlgorithm, input);
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;
            return comparer.Compare(hashOfInput, hash) == 0;
        }
    }
}
