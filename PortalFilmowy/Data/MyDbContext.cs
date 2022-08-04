using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortalFilmowy.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<DbContext> options): base(options){}
        public DbSet<Note> Notes{get; set;}
    }
}
