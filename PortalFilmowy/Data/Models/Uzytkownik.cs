using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Uzytkownik
    {
        public int UzytkownikId { get; set; }
        public string Login { get; set; }
        public string Haslo { get; set; }
        public string Email { get; set; }
        public int TypKonta{ get; set; }

        //navigation properties
        public List<Ocena> Ocena { get; set; }
        public List<Komentarz> Komentarz { get; set; }
        
    }
}
