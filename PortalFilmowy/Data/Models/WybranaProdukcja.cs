using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class WybranaProdukcja
    {
        public int WybranaProdukcjaId { get; set; }
        public int Liczba { get; set; }

        //Navigarion properties
        public int ProdukcjaId{ get; set; }
        public Produkcja produkcja { get; set; }
        public int UzytkownikID { get; set; }
        public Uzytkownik uzytkownik { get; set; } 
    }
}
