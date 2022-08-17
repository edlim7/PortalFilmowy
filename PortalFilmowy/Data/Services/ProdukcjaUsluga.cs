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
        public void AddProdukcjaUzytkownik(ProdukcjaVM produkcja)
        {
            var _produkcja= new Produkcja()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
            foreach(var id in produkcja.UzytkownikId)
            {
                var _produkcja_uzytkownik = new WybranaProdukcja()
                {
                    ProdukcjaId=_produkcja.ProdukcjaId,
                    UzytkownikID=id
                };
                _context.WybranaProdukcja.Add(_produkcja_uzytkownik);
                _context.SaveChanges();
            }
        }
        public void AddProdukcjaOcena(ProdukcjaVM produkcja)
        {
            var _produkcja= new Produkcja()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
            foreach(var id in produkcja.UzytkownikId)
            {
                var _produkcja_ocena = new Ocena()
                {
                    ProdukcjaId=_produkcja.ProdukcjaId,
                    UzytkownikID=id,
                    Liczba = 2                 //jak wlasna licbze to nie wiem
                };
                _context.Ocena.Add(_produkcja_ocena);
                _context.SaveChanges();
            }
        }
        public void AddProdukcjaKomentarz(ProdukcjaVM produkcja)
        {
            var _produkcja= new Produkcja()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
            foreach(var id in produkcja.UzytkownikId)
            {
                var _produkcja_komentarz = new Komentarz()
                {
                    ProdukcjaId=_produkcja.ProdukcjaId,
                    UzytkownikID=id,
                    Tresc = "ale koks"                      //jak wlasny kom to nie wiem
                };
                _context.Komentarz.Add(_produkcja_komentarz);
                _context.SaveChanges();
            }
        }
        public void AddProdukcjaKategoria(ProdukcjaVM produkcja)
        {
            var _produkcja= new Produkcja()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
            foreach(var id in produkcja.KategoriaId)
            {
                var _produkcja_kategoria = new WybranaKategoria()
                {
                    ProdukcjaId=_produkcja.ProdukcjaId,
                    KategoriaID=id,
                };
                _context.WybranaKategoria.Add(_produkcja_kategoria);
                _context.SaveChanges();
            }
        }



        public List<Produkcja> getAllProdukcja() => _context.Produkcja.ToList();
        public Produkcja getProdukcjaById(int produkcjaId)
        {
            return _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==produkcjaId);
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
        public ProdukcjaKategoriaVM getProdukcjaKategoriaById(int produkcjaId)
        {
            var _produkcjaKategoria=_context.Produkcja.Select(produkcja => new ProdukcjaKategoriaVM()
            {
                Nazwa = produkcja.Nazwa,
                Zdjecie=produkcja.Zdjecie,
                Opis = produkcja.Opis,
                KategoriaNazwa  = produkcja.WybranaKategoria.Select(n=>n.kategoria.NazwaKategorii).ToList()
            }).FirstOrDefault();
            return _produkcjaKategoria; 
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
