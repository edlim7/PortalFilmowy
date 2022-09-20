using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmKontroler : ControllerBase
    {
        public FilmUsluga _filmUsluga;
        public FilmKontroler(FilmUsluga filmUsluga)
        {
            _filmUsluga = filmUsluga;
        }
        [HttpPost("addFilm")]
        public IActionResult AddFilm([FromBody]FilmVM film)
        {
            _filmUsluga.AddFilm(film);
            return Ok();
        }
        [HttpPost("addFilm2")] // dodanie do filmu i do produkcji
        public IActionResult AddFilm2([FromBody]FilmProdukcjaVM2 film)
        {
            _filmUsluga.AddFilm2(film);
            return Ok();
        }
        [HttpGet("getAllFilm")]
        public IActionResult GetAllFilm()
        {
            var allFilm = _filmUsluga.getAllFilm();
            return Ok(allFilm);
        }
         [HttpGet("getFilmProdukcja")]
        public IActionResult GetFilmProdukcja()
        {
            var allFilm = _filmUsluga.getFilmProdukcja();
            return Ok(allFilm);
        }
        [HttpGet("getFilmById/{id}")]
        public IActionResult getFilmById(int id)
        {
            var film = _filmUsluga.getFilmById(id);
            return Ok(film);
        }
        [HttpPut("updateFilmById/{id}")]
        public IActionResult updateFilmById(int id, [FromBody]FilmVM film)
        {
            var updatedFilm = _filmUsluga.updateFilmById(id,film);
            return Ok(updatedFilm);
        }
         [HttpDelete("deleteFilmById/{id}")]
        public IActionResult deleteFilmById(int id)
        {
            _filmUsluga.deleteFilmById(id);
            return Ok();
        }
        
    }
}
