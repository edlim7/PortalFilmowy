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
        [HttpPost("addSerial2")]
        public IActionResult AddSerial2([FromBody]SerialProdukcjaVM2 serial)
        {
            _serialUsluga.AddSerial2(serial);
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
        [HttpGet("getSerialByName/{name}")]
        public IActionResult getSerialByName(string name)
        {
            var serial = _serialUsluga.getSerialByName(name);
            return Ok(serial);
        }
        [HttpGet("getSerialKategoria")]
        public IActionResult getSerialKategoria()
        {
            var serial = _serialUsluga.getSerialKategoria();
            return Ok(serial);
        }

        [HttpPut("updateSerialById/{id}")]
        public IActionResult updateSerialById(int id, [FromBody]SerialVM serial)
        {
            var updatedSerial = _serialUsluga.updateSerialById(id,serial);
            return Ok(updatedSerial);
        }
        [HttpPut("updateSerialById2/{id}")]
        public IActionResult updateSerialById2(int id, [FromBody]SerialProdukcjaVM serial)
        {
            var updatedSerial = _serialUsluga.updateSerialById2(id,serial);
            return Ok(updatedSerial);
        }
         [HttpDelete("deleteSerialById/{id}")]
        public IActionResult deleteSerialById(int id)
        {
            _serialUsluga.deleteSerialById(id);
            return Ok();
        }
        [HttpDelete("deleteSerialById2/{id}")]
        public IActionResult deleteSerialById2(int id)
        {
            _serialUsluga.deleteSerialById2(id);
            return Ok();
        }
        
    }
}
