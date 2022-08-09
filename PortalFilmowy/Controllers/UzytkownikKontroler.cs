using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UzytkownikKontroler : ControllerBase
    {

        private UzytkownikUsluga _uzytkownikUsluga;
        public UzytkownikKontroler(UzytkownikUsluga uzytkownikUsluga)
        {
            _uzytkownikUsluga = uzytkownikUsluga;
        }
        [HttpPost("addUzytkownik")]
        public IActionResult AddProdukcja([FromBody]UzytkownikVM uzytkownik)
        {
            _uzytkownikUsluga.AddUzytkownik(uzytkownik);
            return Ok();
        }
        [HttpGet("getAllProdukcja")]
        public IActionResult GetAllProdukcja()
        {
            var allProdukcja = _uzytkownikUsluga.getAllUzytkownik();
            return Ok(allProdukcja);
        }
        [HttpGet("getProdukcjaById/{id}")]
        public IActionResult getProdukcjaById(int id)
        {
            var uzytkownik = _uzytkownikUsluga.getUzytkownikById(id);
            return Ok(uzytkownik);
        }
        [HttpPut("updateProdukcjaById/{id}")]
        public IActionResult updateProdukcjaById(int id, [FromBody]UzytkownikVM uzytkownik)
        {
            var updatedProdukcja = _uzytkownikUsluga.updateUzytkownikById(id,uzytkownik);
            return Ok(updatedProdukcja);
        }
         [HttpDelete("deleteProdukcjaById/{id}")]
        public IActionResult deleteProdukcjaById(int id)
        {
            _uzytkownikUsluga.deleteUzytkownikById(id);
            return Ok();
        }
        
    }
}
