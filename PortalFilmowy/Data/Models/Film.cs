using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Film
    {
        public int FilmId { get; set; }
        public int Oskary { get; set; }

        //Navigation property
        public Produkcja produkcja{ get; set; }
        public int ProdukcjaId{ get; set; }
    }
}
