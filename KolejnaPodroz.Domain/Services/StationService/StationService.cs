using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.StationService
{
    public class StationService : IStationService
    {
        public Station CreateStation(string name, string description, string code, string city)
        {
            return new Station { Name = name, Description = description, Code = code, City = city };
        }
    }
}
