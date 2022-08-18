using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalOcenaowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcenaKontroler : ControllerBase
    {
        public OcenaUsluga _ocenaUsluga;
        public OcenaKontroler(OcenaUsluga ocenaUsluga)
        {
            _ocenaUsluga = ocenaUsluga;
        }
        [HttpPost("addOcena")]
        public IActionResult AddOcena([FromBody]OcenaVM ocena)
        {
            _ocenaUsluga.AddOcena(ocena);
            return Ok();
        }
        [HttpGet("getAllOcena")]
        public IActionResult GetAllOcena()
        {
            var allOcena = _ocenaUsluga.getAllOcena();
            return Ok(allOcena);
        }
        [HttpGet("getOcenaById/{id}")]
        public IActionResult getOcenaById(int id)
        {
            var ocena = _ocenaUsluga.getOcenaById(id);
            return Ok(ocena);
        }
        [HttpPut("updateOcenaById/{id}")]
        public IActionResult updateOcenaById(int id, [FromBody]OcenaVM ocena)
        {
            var updatedOcena = _ocenaUsluga.updateOcenaById(id,ocena);
            return Ok(updatedOcena);
        }
         [HttpDelete("deleteOcenaById/{id}")]
        public IActionResult deleteOcenaById(int id)
        {
            _ocenaUsluga.deleteOcenaById(id);
            return Ok();
        }
        
    }
}
