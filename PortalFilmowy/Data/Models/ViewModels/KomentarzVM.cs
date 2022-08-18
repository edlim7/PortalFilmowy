using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class KomentarzVM
    {
        public string Tresc { get; set; }
        public int ProdukcjaId { get; set; }
        public int UzytkownikId { get; set; }
    }
}
