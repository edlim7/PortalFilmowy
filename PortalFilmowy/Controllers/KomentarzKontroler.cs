using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalKomentarzowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KomentarzKontroler : ControllerBase
    {
        public KomentarzUsluga _komentarzUsluga;
        public KomentarzKontroler(KomentarzUsluga komentarzUsluga)
        {
            _komentarzUsluga = komentarzUsluga;
        }
        [HttpPost("addKomentarz")]
        public IActionResult AddKomentarz([FromBody]KomentarzVM komentarz)
        {
            _komentarzUsluga.AddKomentarz(komentarz);
            return Ok();
        }
        [HttpGet("getAllKomentarz")]
        public IActionResult GetAllKomentarz()
        {
            var allKomentarz = _komentarzUsluga.getAllKomentarz();
            return Ok(allKomentarz);
        }
        [HttpGet("getKomentarzById/{id}")]
        public IActionResult getKomentarzById(int id)
        {
            var komentarz = _komentarzUsluga.getKomentarzById(id);
            return Ok(komentarz);
        }
        [HttpPut("updateKomentarzById/{id}")]
        public IActionResult updateKomentarzById(int id, [FromBody]KomentarzVM komentarz)
        {
            var updatedKomentarz = _komentarzUsluga.updateKomentarzById(id,komentarz);
            return Ok(updatedKomentarz);
        }
         [HttpDelete("deleteKomentarzById/{id}")]
        public IActionResult deleteKomentarzById(int id)
        {
            _komentarzUsluga.deleteKomentarzById(id);
            return Ok();
        }
        
    }
}
