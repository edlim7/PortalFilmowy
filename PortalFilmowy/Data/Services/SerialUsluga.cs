using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PortalFilmowy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PortalFilmowy.Models;

namespace PortalFilmowy.Data.Services
{
    public class SerialUsluga
    {
        private MyDbContext _context;
        public SerialUsluga(MyDbContext context)
        {
            _context = context;
        }
        public void AddSerial(SerialVM serial)
        {
            var _serial= new Serial()
            {
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                ProdukcjaId=serial.ProdukcjaId
                
            };
            _context.Serial.Add(_serial);
            _context.SaveChanges();
        }
        public void AddSerial2(SerialProdukcjaVM2 serial)
        {
            var _produkcja=new Produkcja()
            {
                Nazwa = serial.Nazwa,
                Zdjecie= serial.Zdjecie,
                Opis = serial.Opis,
                KategoriaId = serial.KategoriaId,
                Edukacyjny = serial.Edukacyjny,
                Kino_off = serial.Kino_off,
                Popularnonaukowy = serial.Popularnonaukowy,
                Eksperymentalny = serial.Eksperymentalny,
            };
            _context.Produkcja.Add(_produkcja);
            _context.SaveChanges();
             var _serial= new Serial()
            {
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                ProdukcjaId=_context.Produkcja.Select(n=>n.ProdukcjaId).Max()      
            };
            _context.Serial.Add(_serial);
            _context.SaveChanges();

        }

        public List<SerialProdukcjaVM> getAllSerial()
        {
            var _serialProdukcja=_context.Serial.Select(serial=>new SerialProdukcjaVM()
            {
                serialId=serial.SerialId,
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis,
                Edukacyjny = serial.produkcja.Edukacyjny,
                Kino_off = serial.produkcja.Kino_off,
                Popularnonaukowy = serial.produkcja.Popularnonaukowy,
                Eksperymentalny = serial.produkcja.Eksperymentalny,
                KategoriaId=serial.produkcja.Kategoria.KategoriaId,
                Kategoria = serial.produkcja.Kategoria.NazwaKategorii,
                ProdukcjaId = serial.produkcja.ProdukcjaId
            });
            return _serialProdukcja.ToList();
        }  
        public SerialProdukcjaVM getSerialById(int serialId)
        {
            var _serialProdukcja=_context.Serial.Where(n=>n.SerialId == serialId).Select(serial=>new SerialProdukcjaVM()
            {
                serialId=serial.SerialId,
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis,
                Edukacyjny = serial.produkcja.Edukacyjny,
                Kino_off = serial.produkcja.Kino_off,
                Popularnonaukowy = serial.produkcja.Popularnonaukowy,
                Eksperymentalny = serial.produkcja.Eksperymentalny,
                ProdukcjaId = serial.produkcja.ProdukcjaId,
                Kategoria = serial.produkcja.Kategoria.NazwaKategorii,

            }).FirstOrDefault();
            return _serialProdukcja;
        }
        public SerialProdukcjaVM getSerialByName(string serialName)
        {
            var _serialProdukcja=_context.Serial.Where(n=>n.produkcja.Nazwa == serialName).Select(serial=>new SerialProdukcjaVM()
            {
                serialId=serial.SerialId,
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis,
                Edukacyjny = serial.produkcja.Edukacyjny,
                Kino_off = serial.produkcja.Kino_off,
                Popularnonaukowy = serial.produkcja.Popularnonaukowy,
                Eksperymentalny = serial.produkcja.Eksperymentalny,
                ProdukcjaId = serial.produkcja.ProdukcjaId,
                Kategoria = serial.produkcja.Kategoria.NazwaKategorii,

            }).FirstOrDefault();
            return _serialProdukcja;
        }
        public List<SerialZProdukcjaKategoriaVM> getSerialKategoria()
        {
            var _serialKategoria=_context.Serial.Select(serial=>new SerialZProdukcjaKategoriaVM()
            {
                serialId=serial.SerialId,
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis,
                Edukacyjny = serial.produkcja.Edukacyjny,
                Kino_off = serial.produkcja.Kino_off,
                Popularnonaukowy = serial.produkcja.Popularnonaukowy,
                Eksperymentalny = serial.produkcja.Eksperymentalny,
                ProdukcjaId = serial.produkcja.ProdukcjaId,
                Kategoria = serial.produkcja.Kategoria.NazwaKategorii
            });
            return _serialKategoria.ToList();
        }

        public Serial updateSerialById(int serialId, SerialVM serial)
        {
            var _serial = _context.Serial.FirstOrDefault(n=>n.SerialId==serialId);
            if(_serial!=null)
            {
                _serial.Emmy=serial.Emmy;
                _serial.Sezony = serial.Sezony;
                _serial.Odcinki=serial.Odcinki;
                _context.SaveChanges();
            }
            return _serial;
        }
        public Serial updateSerialById2(int serialId, SerialProdukcjaVM serial)
        {
            var _serial = _context.Serial
            .Include(s=>s.produkcja)
            .FirstOrDefault(n=>n.SerialId==serialId);
            _serial.Emmy=serial.Emmy;
            _serial.Sezony = serial.Sezony;
            _serial.Odcinki=serial.Odcinki;
            _serial.produkcja.Nazwa=serial.Nazwa;
            _serial.produkcja.Zdjecie =serial.Zdjecie;
            _serial.produkcja.Opis = serial.Opis;
            _serial.produkcja.Edukacyjny = serial.Edukacyjny;
            _serial.produkcja.Kino_off = serial.Kino_off;
            _serial.produkcja.Popularnonaukowy = serial.Popularnonaukowy;
            _serial.produkcja.Eksperymentalny = serial.Eksperymentalny;
            _serial.produkcja.KategoriaId = serial.KategoriaId;
            _context.SaveChanges();
            
            return _serial;
        }

        public void deleteSerialById(int serialId)
        {
            var _serial = _context.Serial.FirstOrDefault(n=>n.SerialId==serialId);
            if(_serial!=null)
            {
                _context.Serial.Remove(_serial);
                _context.SaveChanges();
            }
        }
        public void deleteSerialById2(int serialId)
        {
            var _serial = _context.Serial.FirstOrDefault(n=>n.SerialId==serialId);
            var _produkcja = _context.Produkcja.FirstOrDefault(n=>n.ProdukcjaId==_serial.ProdukcjaId);
            if(_serial!=null)
            {
                _context.Serial.Remove(_serial);
                _context.Produkcja.Remove(_produkcja);
                _context.SaveChanges();
            }
        }
    }   
}
