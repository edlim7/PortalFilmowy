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
        public MyDbContext(DbContextOptions<MyDbContext> options): base(options){

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WybranaProdukcja>()
                .HasOne(b => b.uzytkownik)
                .WithMany(ba => ba.WybranaProdukcja)
                .HasForeignKey(bi => bi.UzytkownikID);
            modelBuilder.Entity<WybranaProdukcja>()
                .HasOne(b => b.produkcja)
                .WithMany(ba => ba.WybranaProdukcja)
                .HasForeignKey(bi => bi.ProdukcjaId);
            modelBuilder.Entity<Ocena>()
                .HasOne(b => b.uzytkownik)
                .WithMany(ba => ba.Ocena)
                .HasForeignKey(bi => bi.UzytkownikID);
            modelBuilder.Entity<Ocena>()
                .HasOne(b => b.produkcja)
                .WithMany(ba => ba.Ocena)
                .HasForeignKey(bi => bi.ProdukcjaId);
            modelBuilder.Entity<Komentarz>()
                .HasOne(b => b.uzytkownik)
                .WithMany(ba => ba.Komentarz)
                .HasForeignKey(bi => bi.UzytkownikID);
            modelBuilder.Entity<Komentarz>()
                .HasOne(b => b.produkcja)
                .WithMany(ba => ba.Komentarz)
                .HasForeignKey(bi => bi.ProdukcjaId);      
        }
        public DbSet<Produkcja> Produkcja{get; set;}
        public DbSet<Film> Film{get; set;}
        public DbSet<Serial> Serial{get; set;}
        public DbSet<Kategoria> Kategoria{get; set;}
        public DbSet<WybranaProdukcja> WybranaProdukcja{get; set;}
        public DbSet<Ocena> Ocena{get; set;}
        public DbSet<Komentarz> Komentarz{get; set;}
        public DbSet<Uzytkownik> Uzytkownik{get; set;}

    }
}
