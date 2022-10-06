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
    public class FilmUsluga
    {
        private MyDbContext _context;
        public FilmUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddFilm(FilmVM film)
        {
            var _film= new Film()
            {
                Oskary = film.Oskary,
                ProdukcjaId=film.ProdukcjaId

            };
            _context.Film.Add(_film);
            _context.SaveChanges();
        }
        public void AddFilm2(FilmProdukcjaVM2 film)
        {
            var _produkcja=new Produkcja()
            {
                Nazwa = film.Nazwa,
                Zdjecie= film.Zdjecie,
                Opis = film.Opis,
                KategoriaId = (int)film.KategoriaId,
                Edukacyjny = film.Edukacyjny
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
            var _film= new Film()
            {
                Oskary = film.Oskary,
                ProdukcjaId=_context.Produkcja.Select(n=>n.ProdukcjaId).Max()
            };
            _context.Film.Add(_film);
            _context.SaveChanges();
        }
        public List<Film> getAllFilm() => _context.Film.ToList();
        public FilmProdukcjaVM getFilmById(int filmId)
        {
            var _filmProdukcja=_context.Film.Where(n=>n.FilmId == filmId).Select(film=>new FilmProdukcjaVM()
            {
                FilmId=film.FilmId,
                Oskary=film.Oskary,
                Nazwa = film.produkcja.Nazwa,
                Zdjecie =film.produkcja.Zdjecie,
                Opis = film.produkcja.Opis,
                Edukacyjny = film.produkcja.Edukacyjny,
                ProdukcjaId = film.produkcja.ProdukcjaId,
                Kategoria = film.produkcja.Kategoria.NazwaKategorii
            }).FirstOrDefault();
            return _filmProdukcja;
        }
        public FilmProdukcjaVM getFilmByNazwa(string filmNazwa)
        {
            var _filmProdukcja=_context.Film.Where(n=>n.produkcja.Nazwa == filmNazwa).Select(film=>new FilmProdukcjaVM()
            {
                FilmId=film.FilmId,
                Oskary=film.Oskary,
                Nazwa = film.produkcja.Nazwa,
                Zdjecie =film.produkcja.Zdjecie,
                Opis = film.produkcja.Opis,
                Edukacyjny = film.produkcja.Edukacyjny,
                ProdukcjaId = film.produkcja.ProdukcjaId,
                Kategoria = film.produkcja.Kategoria.NazwaKategorii
            }).FirstOrDefault();
            return _filmProdukcja;
        }
        public List<FilmProdukcjaVM> getFilmProdukcja()
        {
            var _filmProdukcja=_context.Film.Select(film=>new FilmProdukcjaVM()
            {
                FilmId=film.FilmId,
                Oskary=film.Oskary,
                Nazwa = film.produkcja.Nazwa,
                Zdjecie =film.produkcja.Zdjecie,
                Opis = film.produkcja.Opis,
                Edukacyjny = film.produkcja.Edukacyjny,
                ProdukcjaId = film.produkcja.ProdukcjaId,
                Kategoria = film.produkcja.Kategoria.NazwaKategorii,
                KategoriaId = film.produkcja.Kategoria.KategoriaId
            });
            return _filmProdukcja.ToList();
        }  
        public Film updateFilmById(int filmId, FilmVM film)
        {
            var _film = _context.Film.FirstOrDefault(n=>n.FilmId==filmId);
            if(_film!=null)
            {
                _film.Oskary = film.Oskary;
                _context.SaveChanges();
            }
            return _film;
        }
        public Film updateFilmById2(int filmId, FilmProdukcjaUpdateVM film)
        {
            
            var _film = _context.Film
            .Include(s=>s.produkcja)
            .FirstOrDefault(n=>n.FilmId==filmId);
                _film.Oskary = film.Oskary;
                _film.produkcja.Nazwa=film.Nazwa;
                _film.produkcja.Zdjecie =film.Zdjecie;
                _film.produkcja.Opis = film.Opis;
                _film.produkcja.Edukacyjny = film.Edukacyjny;
                _film.produkcja.KategoriaId = film.KategoriaId;
                _context.SaveChanges();
            

            return _film;
        }
        
        public void deleteFilmById(int filmId)
        {
            var _film = _context.Film.FirstOrDefault(n=>n.FilmId==filmId);
            if(_film!=null)
            {
                _context.Film.Remove(_film);
                _context.SaveChanges();
            }
        }
        public void deleteFilmById2(int filmId)
        {
            var _film = _context.Film.FirstOrDefault(n=>n.FilmId==filmId);
            var _produkcja = _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==_film.ProdukcjaId);
            if(_film!=null)
            {
                _context.Film.Remove(_film);
                _context.Produkcja.Remove(_produkcja);
                _context.SaveChanges();
            }
        }
    }   
}
