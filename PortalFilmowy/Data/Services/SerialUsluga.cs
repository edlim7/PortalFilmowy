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
        public List<SerialProdukcjaVM> getAllSerial()
        {
            var _serialProdukcja=_context.Serial.Select(serial=>new SerialProdukcjaVM()
            {
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis
            });
            return _serialProdukcja.ToList();
        }  
        public SerialProdukcjaVM getSerialById(int serialId)
        {
            var _serialProdukcja=_context.Serial.Where(n=>n.SerialId == serialId).Select(serial=>new SerialProdukcjaVM()
            {
                Emmy=serial.Emmy,
                Sezony = serial.Sezony,
                Odcinki=serial.Odcinki,
                Nazwa = serial.produkcja.Nazwa,
                Zdjecie =serial.produkcja.Zdjecie,
                Opis = serial.produkcja.Opis
            }).FirstOrDefault();
            return _serialProdukcja;
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
        public void deleteSerialById(int serialId)
        {
            var _serial = _context.Serial.FirstOrDefault(n=>n.SerialId==serialId);
            if(_serial!=null)
            {
                _context.Serial.Remove(_serial);
                _context.SaveChanges();
            }
        }
    }   
}
