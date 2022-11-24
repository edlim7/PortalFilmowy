using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriaKontroler : ControllerBase
    {
        public KategoriaUsluga _kategoriaUsluga;
        public KategoriaKontroler(KategoriaUsluga kategoriaUsluga)
        {
            _kategoriaUsluga = kategoriaUsluga;
        }
        [HttpPost("addKategoria")]
        public IActionResult AddKategoria([FromBody]KategoriaVM kategoria)
        {
            _kategoriaUsluga.AddKategoria(kategoria);
            return Ok();
        }
        [HttpGet("getAllKategoria")]
        public IActionResult GetAllKategoria()
        {
            var allKategoria = _kategoriaUsluga.getAllKategoria();
            return Ok(allKategoria);
        }
        [HttpGet("getKategoriaById/{id}")]
        public IActionResult getKategoriaById(int id)
        {
            var kategoria = _kategoriaUsluga.getKategoriaById(id);
            return Ok(kategoria);
        }
        [HttpPut("updateKategoriaById/{id}")]
        public IActionResult updateKategoriaById(int id, [FromBody]KategoriaVM kategoria)
        {
            var updatedKategoria = _kategoriaUsluga.updateKategoriaById(id,kategoria);
            return Ok(updatedKategoria);
        }
         [HttpDelete("deleteKategoriaById/{id}")]
        public IActionResult deleteKategoriaById(int id)
        {
            _kategoriaUsluga.deleteKategoriaById(id);
            return Ok();
        }
        
    }
}
