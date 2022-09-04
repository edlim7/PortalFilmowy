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
    public class KategoriaUsluga
    {
        private MyDbContext _context;
        public KategoriaUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddKategoria(KategoriaVM kategoria)
        {
            var _kategoria= new Kategoria()
            {
                NazwaKategorii = kategoria.NazwaKategorii
            };
            _context.Kategoria.Add(_kategoria);
            _context.SaveChanges();
        }
        public List<Kategoria> getAllKategoria() => _context.Kategoria.ToList();
        public Kategoria getKategoriaById(int kategoriaId)
        {
            return _context.Kategoria.FirstOrDefault(n=>n.KategoriaId==kategoriaId);
        }
        public Kategoria updateKategoriaById(int kategoriaId, KategoriaVM kategoria)
        {
            var _kategoria = _context.Kategoria.FirstOrDefault(n=>n.KategoriaId==kategoriaId);
            if(_kategoria!=null)
            {
                _kategoria.NazwaKategorii=kategoria.NazwaKategorii;
                _context.SaveChanges();
            }
            return _kategoria;
        }
        public void deleteKategoriaById(int kategoriaId)
        {
            var _kategoria = _context.Kategoria.FirstOrDefault(n=>n.KategoriaId==kategoriaId);
            if(_kategoria!=null)
            {
                _context.Kategoria.Remove(_kategoria);
                _context.SaveChanges();
            }
        }
    }   
}
