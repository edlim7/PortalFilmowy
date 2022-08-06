using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int AccountType { get; set; }
    }
}