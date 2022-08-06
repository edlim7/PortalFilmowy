using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PortalFilmowy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortalFilmowy.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options): base(options){}
        public DbSet<Produkcja> Produkcja{get; set;}
    }
}
