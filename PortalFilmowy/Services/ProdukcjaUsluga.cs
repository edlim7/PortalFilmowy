using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PortalFilmowy.Data;
using PortalFilmowy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortalFilmowy.Services
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

    }   
}
