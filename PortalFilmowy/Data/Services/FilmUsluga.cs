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

            };
            _context.Film.Add(_film);
            _context.SaveChanges();
        }
        public List<Film> getAllFilm() => _context.Film.ToList();
        public Film getFilmById(int filmId)
        {
            return _context.Film.FirstOrDefault(n=>n.FilmId==filmId);
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
        public void deleteFilmById(int filmId)
        {
            var _film = _context.Film.FirstOrDefault(n=>n.FilmId==filmId);
            if(_film!=null)
            {
                _context.Film.Remove(_film);
                _context.SaveChanges();
            }
        }
    }   
}
