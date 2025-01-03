using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class ProdukcjaVM
    {
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public int KategoriaId{ get; set; }
        public List<int> OcenaId{ get; set; }
        public List<int> KomentarzId{ get; set; }
    }
    public class ProdukcjaOcenaVM
    {
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public List<int> OcenaLiczba{ get; set; }
        public List<string> UzytkownikNazwa{ get; set; }
        
    }
    public class ProdukcjaKategoriaVM
    {
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public int KategoriaId { get; set; }
        public string NazwaKategorii{ get; set; }
        
        
    }
    public class ProdukcjaKomentarzVM
    {
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public List<string> Komentarze{ get; set; }
        public List<string> UzytkownikNazwa{ get; set; }
        
    }
    
}
