using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class FilmVM
    {
        public int Oskary { get; set; }
        public int ProdukcjaId { get; set; }
    }
    public class FilmProdukcjaVM
    {
        public int Oskary { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public int ProdukcjaId { get; set; }
        public string Kategoria { get; set; }
        
    }

}
