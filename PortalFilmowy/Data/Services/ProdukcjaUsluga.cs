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
    public class ProdukcjaUsluga
    {
        private MyDbContext _context;
        public ProdukcjaUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddProdukcja(ProdukcjaVM produkcja)
        {
            var _produkcja= new Produkcja()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
        }
        public List<Produkcja> getAllProdukcja() => _context.Produkcja.ToList();
        public Produkcja getProdukcjaById(int produkcjaId)
        {
            return _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
        }
        public Produkcja updateProdukcjaById(int produkcjaId, ProdukcjaVM produkcja)
        {
            var _produkcja = _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
            if(_produkcja!=null)
            {
                _produkcja.Nazwa=produkcja.Nazwa;
                _produkcja.Zdjecie=produkcja.Zdjecie;
                _produkcja.Opis = produkcja.Opis;
                _context.SaveChanges();
            }
            return _produkcja;
        }
        public void deleteProdukcjaById(int produkcjaId)
        {
            var _produkcja = _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
            if(_produkcja!=null)
            {
                _context.Produkcja.Remove(_produkcja);
                _context.SaveChanges();
            }
        }
    }   
}
