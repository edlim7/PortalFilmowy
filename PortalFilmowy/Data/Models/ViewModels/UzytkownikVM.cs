using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class UzytkownikVM
    {
        
        public int UzytkownikId { get; set; }
        public string Login { get; set; }
        public string Haslo { get; set; }
        public string Email { get; set; }
        public int TypKonta{ get; set; }
    }
}
