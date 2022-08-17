using Microsoft.AspNetCore.Identity;


namespace PortalFilmowy.Models
{
    public class Serial
    {
        public int SerialId { get; set; }
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }

        //Navigarion properties
        public int ProdukcjaId{ get; set; }
        public Produkcja produkcja{ get; set; }
    }
}
