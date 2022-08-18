using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class OcenaVM
    {
        public int Liczba { get; set; }
        public int ProdukcjaId { get; set; }
        public int UzytkownikId { get; set; }
    }
}
