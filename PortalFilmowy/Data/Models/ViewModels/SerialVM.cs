using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class SerialVM
    {
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }
        public int ProdukcjaId { get; set; }
    }
    public class SerialZProdukcjaKategoriaVM
    {
        public int serialId{ get; set; }
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public int ProdukcjaId { get; set; }
        public string Kategoria { get; set; }
    }
public class SerialProdukcjaVM
    {
        public int serialId{ get; set; }
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public int ProdukcjaId { get; set; }
        public string Kategoria { get; set; }
        public int KategoriaId{ get; set; }
    }
    public class SerialProdukcjaVM2
    {
        
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
        public bool Edukacyjny { get; set; }
        public bool Kino_off { get; set; }
        public bool Popularnonaukowy { get; set; }
        public bool Eksperymentalny { get; set; }
        public int ProdukcjaId { get; set; }
        public int KategoriaId { get; set; }
    }
}


