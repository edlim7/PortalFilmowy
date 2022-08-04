using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Production
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}
