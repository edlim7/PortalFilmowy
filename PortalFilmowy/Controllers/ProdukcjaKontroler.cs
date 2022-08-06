using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalFilmowy.Data;
using PortalFilmowy.Models;
using PortalFilmowy.Services;

namespace PortalFilmowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdukcjaKontroler : ControllerBase
    {
        public ProdukcjaUsluga _produkcjaUsluga;
        public ProdukcjaKontroler(ProdukcjaUsluga produkcjaUsluga)
        {
            _produkcjaUsluga = produkcjaUsluga;
        }
        [HttpPost("add-produkcja")]
        public IActionResult AddProdukcja([FromBody]ProdukcjaVM produkcja)
        {
            _produkcjaUsluga.AddProdukcja(produkcja);
            return Ok();
        }
    }
}
