using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class WybranaKategoria
    {
        public int WybranaKategoriaId { get; set; }

        //Navigarion properties
        public int ProdukcjaId{ get; set; }
        public Produkcja produkcja { get; set; }
        public int KategoriaID { get; set; }
        public Kategoria kategoria { get; set; } 
    }
}
