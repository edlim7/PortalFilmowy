using Microsoft.AspNetCore.Mvc;
using PortalFilmowy.Data.Services;
using PortalFilmowy.Models;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SerialKontroler : ControllerBase
    {
        public SerialUsluga _serialUsluga;
        public SerialKontroler(SerialUsluga serialUsluga)
        {
            _serialUsluga = serialUsluga;
        }
        [HttpPost("addSerial")]
        public IActionResult AddSerial([FromBody]SerialVM serial)
        {
            _serialUsluga.AddSerial(serial);
            return Ok();
        }
        [HttpGet("getAllSerial")]
        public IActionResult GetAllSerial()
        {
            var allSerial = _serialUsluga.getAllSerial();
            return Ok(allSerial);
        }
        [HttpGet("getSerialById/{id}")]
        public IActionResult getSerialById(int id)
        {
            var serial = _serialUsluga.getSerialById(id);
            return Ok(serial);
        }
        [HttpPut("updateSerialById/{id}")]
        public IActionResult updateSerialById(int id, [FromBody]SerialVM serial)
        {
            var updatedSerial = _serialUsluga.updateSerialById(id,serial);
            return Ok(updatedSerial);
        }
         [HttpDelete("deleteSerialById/{id}")]
        public IActionResult deleteSerialById(int id)
        {
            _serialUsluga.deleteSerialById(id);
            return Ok();
        }
        
    }
}
