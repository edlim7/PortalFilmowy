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
    public class OcenaUsluga
    {
        private MyDbContext _context;
        public OcenaUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddOcena(OcenaVM ocena)
        {
            var _ocena= new Ocena()
            {
                Liczba = ocena.Liczba,
                ProdukcjaId=ocena.ProdukcjaId,
                UzytkownikID=ocena.UzytkownikId
            };
            _context.Ocena.Add(_ocena);
            _context.SaveChanges();
        }
        public List<Ocena> getAllOcena() => _context.Ocena.ToList();
        public Ocena getOcenaById(int ocenaId)
        {
            return _context.Ocena.FirstOrDefault(n=>n.OcenaId==ocenaId);
        }
        public Ocena updateOcenaById(int ocenaId, OcenaVM ocena)
        {
            var _ocena = _context.Ocena.FirstOrDefault(n=>n.OcenaId==ocenaId);
            if(_ocena!=null)
            {
                _ocena.Liczba = ocena.Liczba;
                _context.SaveChanges();
            }
            return _ocena;
        }
        public void deleteOcenaById(int ocenaId)
        {
            var _ocena = _context.Ocena.FirstOrDefault(n=>n.OcenaId==ocenaId);
            if(_ocena!=null)
            {
                _context.Ocena.Remove(_ocena);
                _context.SaveChanges();
            }
        }
    }   
}
