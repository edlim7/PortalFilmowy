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
                Odcinki=serial.Odcinki
            };
            _context.Serial.Add(_serial);
            _context.SaveChanges();
        }
        public List<Serial> getAllSerial() => _context.Serial.ToList();
        public Serial getSerialById(int serialId)
        {
            return _context.Serial.FirstOrDefault(n=>n.SerialId==serialId);
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
