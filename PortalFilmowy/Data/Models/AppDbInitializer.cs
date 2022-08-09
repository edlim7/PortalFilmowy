using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PortalFilmowy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortalFilmowy.Data
{
    public class AppDbInitializer 
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope=applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MyDbContext>();
                if(!context.Produkcja.Any())
                {
                    context.Produkcja.AddRange(new Produkcja()
                    {
                            Nazwa = "The Walking Dead",
                            Zdjecie = "Jakis path",
                            Opis = "Series about zombies"
                    },
                    new Produkcja()
                    {
                            Nazwa = "Harry Potter & Philosopher's Stone",
                            Zdjecie = "Jakis path",
                            Opis = "You are a wizard harry"
                    });
                    context.SaveChanges();
                }
            }
        }

    }
}
