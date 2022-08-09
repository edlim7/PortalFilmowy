using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Kategoria
    {
        public int KategoriaId { get; set; }
        public string NazwaKategorii { get; set; }

        //Navigarion properties
        public int ProdukcjaId { get; set; }
        public Produkcja produkcja{ get; set; }
    }
}
