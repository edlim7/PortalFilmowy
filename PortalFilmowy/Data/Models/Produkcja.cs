using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Produkcja
    {
        public int ProdukcjaId { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; } 
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }

        //Nav
        public int KategoriaId { get; set; }
        public Kategoria Kategoria { get; set; }
        public List<Film> film { get; set; }
        public List<Serial> serial { get; set; }
        public List<Ocena> Ocena { get; set; }
        public List<Komentarz> Komentarz { get; set; }
    }
}
