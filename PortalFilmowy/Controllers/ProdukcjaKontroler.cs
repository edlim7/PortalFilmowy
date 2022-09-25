using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdukcjaKontroler : ControllerBase
    {
        public ProdukcjaUsluga _produkcjaUsluga;
        public FilmUsluga _filmUsluga;
        public ProdukcjaKontroler(ProdukcjaUsluga produkcjaUsluga,FilmUsluga filmUsluga)
        {
            _produkcjaUsluga = produkcjaUsluga;
            _filmUsluga=filmUsluga;
        }
        [HttpPost("addProdukcjaUzytkownik")]
        public IActionResult AddProdukcjaUzytkownik([FromBody]ProdukcjaVM produkcja)
        {
            _produkcjaUsluga.AddProdukcjaUzytkownik(produkcja);
            return Ok();
        }
        
        [HttpPost("addProdukcja")]
        public IActionResult AddProdukcja([FromBody]ProdukcjaVM produkcja)
        {
            _produkcjaUsluga.AddProdukcja(produkcja);
            return Ok();
        }
        
        [HttpGet("getAllProdukcja")]
        public IActionResult GetAllProdukcja()
        {
            var allProdukcja = _produkcjaUsluga.getAllProdukcja();
            return Ok(allProdukcja);
        }
        [HttpGet("getProdukcjaKategoria")]
        public IActionResult GetProdukcjaKategoria()
        {
            var allProdukcja = _produkcjaUsluga.getProdukcjaKategoria();
            return Ok(allProdukcja);
        }
        [HttpGet("getProdukcjaById/{id}")]
        public IActionResult getProdukcjaById(int id)
        {
            var produkcja = _produkcjaUsluga.getProdukcjaById(id);
            return Ok(produkcja);
        }
        [HttpGet("getProdukcjaByName/{Name}")]
        public IActionResult getProdukcjaByName(string name)
        {
            var produkcja = _produkcjaUsluga.getProdukcjaByName(name);
            return Ok(produkcja);
        }
     
        [HttpPut("updateProdukcjaById/{id}")]
        public IActionResult updateProdukcjaById(int id, [FromBody]ProdukcjaVM produkcja)
        {
            var updatedProdukcja = _produkcjaUsluga.updateProdukcjaById(id,produkcja);
            return Ok(updatedProdukcja);
        }
         [HttpDelete("deleteProdukcjaById/{id}")]
        public IActionResult deleteProdukcjaById(int id)
        {
            _produkcjaUsluga.deleteProdukcjaById(id);
            return Ok();
        }
        
    }
}
