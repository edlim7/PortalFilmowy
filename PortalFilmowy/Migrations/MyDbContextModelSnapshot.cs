﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortalFilmowy.Data;

#nullable disable

namespace PortalFilmowy.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("PortalFilmowy.Models.Film", b =>
                {
                    b.Property<int>("FilmId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FilmId"), 1L, 1);

                    b.Property<int>("Oskary")
                        .HasColumnType("int");

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.HasKey("FilmId");

                    b.HasIndex("ProdukcjaId");

                    b.ToTable("Film");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Kategoria", b =>
                {
                    b.Property<int>("KategoriaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KategoriaId"), 1L, 1);

                    b.Property<string>("NazwaKategorii")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("KategoriaId");

                    b.ToTable("Kategoria");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Komentarz", b =>
                {
                    b.Property<int>("KomentarzId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KomentarzId"), 1L, 1);

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.Property<string>("Tresc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UzytkownikID")
                        .HasColumnType("int");

                    b.HasKey("KomentarzId");

                    b.HasIndex("ProdukcjaId");

                    b.HasIndex("UzytkownikID");

                    b.ToTable("Komentarz");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Ocena", b =>
                {
                    b.Property<int>("OcenaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OcenaId"), 1L, 1);

                    b.Property<int>("Liczba")
                        .HasColumnType("int");

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.Property<int>("UzytkownikID")
                        .HasColumnType("int");

                    b.HasKey("OcenaId");

                    b.HasIndex("ProdukcjaId");

                    b.HasIndex("UzytkownikID");

                    b.ToTable("Ocena");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Produkcja", b =>
                {
                    b.Property<int>("ProdukcjaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProdukcjaId"), 1L, 1);

                    b.Property<string>("Nazwa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zdjecie")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProdukcjaId");

                    b.ToTable("Produkcja");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Serial", b =>
                {
                    b.Property<int>("SerialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SerialId"), 1L, 1);

                    b.Property<int>("Emmy")
                        .HasColumnType("int");

                    b.Property<int>("Odcinki")
                        .HasColumnType("int");

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.Property<int>("Sezony")
                        .HasColumnType("int");

                    b.HasKey("SerialId");

                    b.HasIndex("ProdukcjaId");

                    b.ToTable("Serial");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Uzytkownik", b =>
                {
                    b.Property<int>("UzytkownikId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UzytkownikId"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Haslo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TypKonta")
                        .HasColumnType("int");

                    b.HasKey("UzytkownikId");

                    b.ToTable("Uzytkownik");
                });

            modelBuilder.Entity("PortalFilmowy.Models.WybranaKategoria", b =>
                {
                    b.Property<int>("WybranaKategoriaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WybranaKategoriaId"), 1L, 1);

                    b.Property<int>("KategoriaID")
                        .HasColumnType("int");

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.HasKey("WybranaKategoriaId");

                    b.HasIndex("KategoriaID");

                    b.HasIndex("ProdukcjaId");

                    b.ToTable("WybranaKategoria");
                });

            modelBuilder.Entity("PortalFilmowy.Models.WybranaProdukcja", b =>
                {
                    b.Property<int>("WybranaProdukcjaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WybranaProdukcjaId"), 1L, 1);

                    b.Property<int>("ProdukcjaId")
                        .HasColumnType("int");

                    b.Property<int>("UzytkownikID")
                        .HasColumnType("int");

                    b.HasKey("WybranaProdukcjaId");

                    b.HasIndex("ProdukcjaId");

                    b.HasIndex("UzytkownikID");

                    b.ToTable("WybranaProdukcja");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Film", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("film")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("produkcja");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Komentarz", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("Komentarz")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortalFilmowy.Models.Uzytkownik", "uzytkownik")
                        .WithMany("Komentarz")
                        .HasForeignKey("UzytkownikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("produkcja");

                    b.Navigation("uzytkownik");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Ocena", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("Ocena")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortalFilmowy.Models.Uzytkownik", "uzytkownik")
                        .WithMany("Ocena")
                        .HasForeignKey("UzytkownikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("produkcja");

                    b.Navigation("uzytkownik");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Serial", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("serial")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("produkcja");
                });

            modelBuilder.Entity("PortalFilmowy.Models.WybranaKategoria", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Kategoria", "kategoria")
                        .WithMany("WybranaKategoria")
                        .HasForeignKey("KategoriaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("WybranaKategoria")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("kategoria");

                    b.Navigation("produkcja");
                });

            modelBuilder.Entity("PortalFilmowy.Models.WybranaProdukcja", b =>
                {
                    b.HasOne("PortalFilmowy.Models.Produkcja", "produkcja")
                        .WithMany("WybranaProdukcja")
                        .HasForeignKey("ProdukcjaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortalFilmowy.Models.Uzytkownik", "uzytkownik")
                        .WithMany("WybranaProdukcja")
                        .HasForeignKey("UzytkownikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("produkcja");

                    b.Navigation("uzytkownik");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Kategoria", b =>
                {
                    b.Navigation("WybranaKategoria");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Produkcja", b =>
                {
                    b.Navigation("Komentarz");

                    b.Navigation("Ocena");

                    b.Navigation("WybranaKategoria");

                    b.Navigation("WybranaProdukcja");

                    b.Navigation("film");

                    b.Navigation("serial");
                });

            modelBuilder.Entity("PortalFilmowy.Models.Uzytkownik", b =>
                {
                    b.Navigation("Komentarz");

                    b.Navigation("Ocena");

                    b.Navigation("WybranaProdukcja");
                });
#pragma warning restore 612, 618
        }
    }
}
