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
                Opis = produkcja.Opis,
                KategoriaId = produkcja.KategoriaId,
                Edukacyjny = produkcja.Edukacyjny
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
        }


        public List<Produkcja> getAllProdukcja() => _context.Produkcja.ToList();
        public List<ProdukcjaKategoriaVM> getProdukcjaKategoria() 
        {
            var _produkcjaKategoria=_context.Produkcja.Select(produkcja=>new ProdukcjaKategoriaVM()
            {
                Nazwa=produkcja.Nazwa,
                Zdjecie = produkcja.Zdjecie,
                Opis=produkcja.Opis,
                Edukacyjny = produkcja.Edukacyjny,
                KategoriaId = produkcja.Kategoria.KategoriaId,
                NazwaKategorii = produkcja.Kategoria.NazwaKategorii
            });
            return _produkcjaKategoria.ToList();
        }
        public Produkcja getProdukcjaById(int produkcjaId)
        {
            return _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
        }
        public Produkcja getProdukcjaByName(string produkcjaName)
        {
            return _context.Produkcja.FirstOrDefault(n=>n.Nazwa==produkcjaName);
        }
        public ProdukcjaOcenaVM getProdukcjaOcenaById(int produkcjaId)
        {
            var _produkcjaOcena=_context.Produkcja.Select(produkcja => new ProdukcjaOcenaVM()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis,
                OcenaLiczba=produkcja.Ocena.Select(n=>n.Liczba).ToList(),
                UzytkownikNazwa = produkcja.Ocena.Select(n=>n.uzytkownik.Login).ToList()
            }).FirstOrDefault();
            return _produkcjaOcena; 
        }
        public ProdukcjaKomentarzVM getProdukcjaKomentarzById(int produkcjaId)
        {
            var _produkcjaKomentarz=_context.Produkcja.Select(produkcja => new ProdukcjaKomentarzVM()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis,
                Komentarze=produkcja.Komentarz.Select(n=>n.Tresc).ToList(),
                UzytkownikNazwa = produkcja.Komentarz.Select(n=>n.uzytkownik.Login).ToList()
            }).FirstOrDefault();
            return _produkcjaKomentarz; 
        }

        public Produkcja updateProdukcjaById(int produkcjaId, ProdukcjaVM produkcja)
        {
            var _produkcja = _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
            if(_produkcja!=null)
            {
                _produkcja.Nazwa=produkcja.Nazwa;
                _produkcja.Zdjecie=produkcja.Zdjecie;
                _produkcja.Opis = produkcja.Opis;
                _produkcja.Edukacyjny = produkcja.Edukacyjny;
                _produkcja.KategoriaId=produkcja.KategoriaId;
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
