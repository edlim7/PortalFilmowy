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
        public IActionResult AddUzytkownik([FromBody]UzytkownikVM uzytkownik)
        {
            _uzytkownikUsluga.AddUzytkownik(uzytkownik);
            return Ok();
        }
        [HttpPost("addUzytkownik2")]
        public IActionResult AddUzytkownik2([FromBody]UzytkownikVM uzytkownik)
        {
            _uzytkownikUsluga.AddUzytkownik2(uzytkownik);
            return Ok();
        }
        [HttpGet("getAllUzytkownik")]
        public IActionResult GetAllUzytkownik()
        {
            var allUzytkownik = _uzytkownikUsluga.getAllUzytkownik();
            return Ok(allUzytkownik);
        }
        [HttpGet("getUzytkownikById/{id}")]
        public IActionResult getUzytkownikById(int id)
        {
            var uzytkownik = _uzytkownikUsluga.getUzytkownikById(id);
            return Ok(uzytkownik);
        }
        [HttpPut("updateUzytkownikById/{id}")]
        public IActionResult updateUzytkownikById(int id, [FromBody]UzytkownikVM uzytkownik)
        {
            var updatedUzytkownik = _uzytkownikUsluga.updateUzytkownikById(id,uzytkownik);
            return Ok(updatedUzytkownik);
        }
         [HttpPut("updateUzytkownikById2/{id}")]
        public IActionResult updateUzytkownikById2(int id, [FromBody]UzytkownikVM uzytkownik)
        {
            var updatedUzytkownik = _uzytkownikUsluga.updateUzytkownikById2(id,uzytkownik);
            return Ok(updatedUzytkownik);
        }
         [HttpDelete("deleteUzytkownikById/{id}")]
        public IActionResult deleteUzytkownikById(int id)
        {
            _uzytkownikUsluga.deleteUzytkownikById(id);
            return Ok();
        }
        
    }
}
