using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.ConnectionService
{
    public interface IConnectionService
    {
        Connection CreateConnection(Station from, Station destination, DateTime departureTime, DateTime arrivalTime, Provider provider);

    }
}
