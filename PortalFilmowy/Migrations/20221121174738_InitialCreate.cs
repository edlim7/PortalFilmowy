﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalFilmowy.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategoria",
                columns: table => new
                {
                    KategoriaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazwaKategorii = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoria", x => x.KategoriaId);
                });

            migrationBuilder.CreateTable(
                name: "Uzytkownik",
                columns: table => new
                {
                    UzytkownikId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Haslo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypKonta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uzytkownik", x => x.UzytkownikId);
                });

            migrationBuilder.CreateTable(
                name: "Produkcja",
                columns: table => new
                {
                    ProdukcjaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nazwa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zdjecie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Edukacyjny = table.Column<bool>(type: "bit", nullable: false),
                    Kino_off = table.Column<bool>(type: "bit", nullable: false),
                    Popularnonaukowy = table.Column<bool>(type: "bit", nullable: false),
                    Eksperymentalny = table.Column<bool>(type: "bit", nullable: false),
                    KategoriaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produkcja", x => x.ProdukcjaId);
                    table.ForeignKey(
                        name: "FK_Produkcja_Kategoria_KategoriaId",
                        column: x => x.KategoriaId,
                        principalTable: "Kategoria",
                        principalColumn: "KategoriaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Film",
                columns: table => new
                {
                    FilmId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oskary = table.Column<int>(type: "int", nullable: false),
                    ProdukcjaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Film", x => x.FilmId);
                    table.ForeignKey(
                        name: "FK_Film_Produkcja_ProdukcjaId",
                        column: x => x.ProdukcjaId,
                        principalTable: "Produkcja",
                        principalColumn: "ProdukcjaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Komentarz",
                columns: table => new
                {
                    KomentarzId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tresc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdukcjaId = table.Column<int>(type: "int", nullable: false),
                    UzytkownikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komentarz", x => x.KomentarzId);
                    table.ForeignKey(
                        name: "FK_Komentarz_Produkcja_ProdukcjaId",
                        column: x => x.ProdukcjaId,
                        principalTable: "Produkcja",
                        principalColumn: "ProdukcjaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Komentarz_Uzytkownik_UzytkownikID",
                        column: x => x.UzytkownikID,
                        principalTable: "Uzytkownik",
                        principalColumn: "UzytkownikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ocena",
                columns: table => new
                {
                    OcenaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Liczba = table.Column<int>(type: "int", nullable: false),
                    ProdukcjaId = table.Column<int>(type: "int", nullable: false),
                    UzytkownikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocena", x => x.OcenaId);
                    table.ForeignKey(
                        name: "FK_Ocena_Produkcja_ProdukcjaId",
                        column: x => x.ProdukcjaId,
                        principalTable: "Produkcja",
                        principalColumn: "ProdukcjaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ocena_Uzytkownik_UzytkownikID",
                        column: x => x.UzytkownikID,
                        principalTable: "Uzytkownik",
                        principalColumn: "UzytkownikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Serial",
                columns: table => new
                {
                    SerialId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emmy = table.Column<int>(type: "int", nullable: false),
                    Sezony = table.Column<int>(type: "int", nullable: false),
                    Odcinki = table.Column<int>(type: "int", nullable: false),
                    ProdukcjaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Serial", x => x.SerialId);
                    table.ForeignKey(
                        name: "FK_Serial_Produkcja_ProdukcjaId",
                        column: x => x.ProdukcjaId,
                        principalTable: "Produkcja",
                        principalColumn: "ProdukcjaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Film_ProdukcjaId",
                table: "Film",
                column: "ProdukcjaId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentarz_ProdukcjaId",
                table: "Komentarz",
                column: "ProdukcjaId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentarz_UzytkownikID",
                table: "Komentarz",
                column: "UzytkownikID");

            migrationBuilder.CreateIndex(
                name: "IX_Ocena_ProdukcjaId",
                table: "Ocena",
                column: "ProdukcjaId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocena_UzytkownikID",
                table: "Ocena",
                column: "UzytkownikID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkcja_KategoriaId",
                table: "Produkcja",
                column: "KategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Serial_ProdukcjaId",
                table: "Serial",
                column: "ProdukcjaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Film");

            migrationBuilder.DropTable(
                name: "Komentarz");

            migrationBuilder.DropTable(
                name: "Ocena");

            migrationBuilder.DropTable(
                name: "Serial");

            migrationBuilder.DropTable(
                name: "Uzytkownik");

            migrationBuilder.DropTable(
                name: "Produkcja");

            migrationBuilder.DropTable(
                name: "Kategoria");
        }
    }
}
