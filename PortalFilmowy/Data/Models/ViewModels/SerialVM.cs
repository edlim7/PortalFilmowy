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
    public class SerialProdukcjaVM
    {
        public int Emmy { get; set; }
        public int Sezony { get; set; }
        public int Odcinki { get; set; }
        public string Nazwa { get; set; }
        public string Zdjecie { get; set; }
        public string Opis { get; set; }
    }
}
