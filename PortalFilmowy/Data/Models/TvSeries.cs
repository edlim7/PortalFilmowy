using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class TvSeries
    {
        public int Id { get; set; }
        public int Emmys { get; set; }
        public int Seasons { get; set; }
        public int Episodes { get; set; }
    }
}
