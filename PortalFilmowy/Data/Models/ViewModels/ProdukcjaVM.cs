using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class ProdukcjaVM
    {
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }

        public int FilmId{ get; set; }
        public int SerialId{ get; set; }
        public List<int> KategoriaId{ get; set; }
        public List<int> OcenaId{ get; set; }
        public List<int> UzytkownikId{ get; set; }
        public List<int> KomentarzId{ get; set; }
    }
}
