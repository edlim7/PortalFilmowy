using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PortalFilmowy.Data;
using PortalFilmowy.Data.Services;


namespace PortalFilmowy
{
    public class Startup
    {
        public string ConnectionString{get;set;}
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            ConnectionString = Configuration.GetConnectionString("DefaultConnection");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(
            CertificateAuthenticationDefaults.AuthenticationScheme)
            .AddCertificate();
            services.AddControllers();
            // Default Policy
            services.AddCors(options =>
            {
            options.AddDefaultPolicy(
            builder =>
            {
                builder.WithOrigins("http://localhost:3000", "https://localhost:5001", "http://localhost:5000","https://localhost:5001/api/KomentarzKontroler/addKomentarz","http://localhost:3000/filmy","http://localhost:3000/seriale","http://localhost:3000/filmyRanking","http://localhost:3000/serialeRanking")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                });
            });
            services.AddCors(options =>
            {
              options.AddPolicy(name: "AllowOrigin",
               builder =>
                {
                builder.WithOrigins("http://localhost:3000", "https://localhost:5001", "http://localhost:5000","https://localhost:5001/api/KomentarzKontroler/addKomentarz")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                });
            });
            //Configure DBcontext
            services.AddDbContext<MyDbContext>(options =>options.UseSqlServer(ConnectionString));
            //services.AddControllersWithViews();
            //Configure services
            services.AddTransient<ProdukcjaUsluga>();
            services.AddTransient<FilmUsluga>();
            services.AddTransient<UzytkownikUsluga>();
            services.AddTransient<SerialUsluga>();
            services.AddTransient<KomentarzUsluga>();
            services.AddTransient<OcenaUsluga>();
            services.AddTransient<KategoriaUsluga>();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
             app.UseCors();
            // with a named pocili
            app.UseCors("AllowOrigin");
            app.UseCors(builder =>
            {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();
            //app.UseStaticFiles();
            //app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

           





           // AppDbInitializer.Seed(app);
           /*  app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            }); */
        }
        
    }
}
