using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Produkcja
    {
        public int ProdukcjaId { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
    }
}
