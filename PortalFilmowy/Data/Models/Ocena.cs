using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Ocena
    {
        public int OcenaId { get; set; }
        public int Rate { get; set; }

        //Navigarion properties
        public int ProdukcjaId{ get; set; }
        public Produkcja produkcja { get; set; }
        public int UzytkownikID { get; set; }
        public Uzytkownik uzytkownik { get; set; } 
    }
}
