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
    public class KomentarzUsluga
    {
        private MyDbContext _context;
        public KomentarzUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddKomentarz(KomentarzVM komentarz)
        {
            var _komentarz= new Komentarz()
            {
                Tresc = komentarz.Tresc,
                ProdukcjaId=komentarz.ProdukcjaId,
                UzytkownikID=komentarz.UzytkownikId
            };
            _context.Komentarz.Add(_komentarz);
            _context.SaveChanges();
        }
        public List<Komentarz> getAllKomentarz() => _context.Komentarz.ToList();
        public Komentarz getKomentarzById(int komentarzId)
        {
            return _context.Komentarz.FirstOrDefault(n=>n.KomentarzId==komentarzId);
        }
        public Komentarz updateKomentarzById(int komentarzId, KomentarzVM komentarz)
        {
            var _komentarz = _context.Komentarz.FirstOrDefault(n=>n.KomentarzId==komentarzId);
            if(_komentarz!=null)
            {
                _komentarz.Tresc = komentarz.Tresc;
                _context.SaveChanges();
            }
            return _komentarz;
        }
        public void deleteKomentarzById(int komentarzId)
        {
            var _komentarz = _context.Komentarz.FirstOrDefault(n=>n.KomentarzId==komentarzId);
            if(_komentarz!=null)
            {
                _context.Komentarz.Remove(_komentarz);
                _context.SaveChanges();
            }
        }
    }   
}
