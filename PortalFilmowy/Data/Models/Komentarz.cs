using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Komentarz
    {
        public int KomentarzId { get; set; }
        public string Tresc { get; set; }
        
        //navigation properties
         public int ProdukcjaId{ get; set; }
        public Produkcja produkcja { get; set; }
        public int UzytkownikID { get; set; }
        public Uzytkownik uzytkownik { get; set; } 

    }
}
