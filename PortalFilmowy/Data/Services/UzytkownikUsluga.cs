using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PortalFilmowy.Data;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PortalFilmowy.Models;

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
            var _uzytkownik= new Uzytkownik()
            {
                Login = uzytkownik.Login,
                Haslo =uzytkownik.Haslo,
                Email = uzytkownik.Email,
                TypKonta = uzytkownik.TypKonta
            };
            _context.Uzytkownik.Add(_uzytkownik);
            _context.SaveChanges();
        }
        public List<Uzytkownik> getAllUzytkownik() => _context.Uzytkownik.ToList();
        public Uzytkownik getUzytkownikById(int uzytkownikId)
        {
            return _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
        }
        public Uzytkownik updateUzytkownikById(int uzytkownikId, UzytkownikVM uzytkownik)
        {
            var _uzytkownik = _context.Uzytkownik.FirstOrDefault(n=>n.UzytkownikId==uzytkownikId);
            if(_uzytkownik!=null)
            {
                _uzytkownik.Login = uzytkownik.Login;
                _uzytkownik.Haslo =uzytkownik.Haslo;
                _uzytkownik.Email = uzytkownik.Email;
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
      
    }   
}
